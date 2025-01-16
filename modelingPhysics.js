import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

let handLandmarker;
let handResults;

let isInitializing = false;

const { Engine, Bodies, Composite, Body, Vector, Render } = Matter;

let engine;

let entities = [];

let palm;

class Box {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, {
      restitution: 1.0,
      density: 0.002,
      collisionFilter: {
        category: 0x0001, // Regular object category
        mask: 0x0003,
      },
    });
    Composite.add(engine.world, this.body);
  }

  draw() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    rect(0, 0, this.w, this.h);
    pop();
  }

  isAlive(p5) {
    const [x, y] = [this.body.position.x, this.body.position.y];
    if (x > 0 && x < p5.width && y > 0 && y < p5.height) return true;
    Composite.remove(engine.world, this.body);
    return false;
  }
}

class Palm {
  constructor(x, y, r) {
    this.r = r;
    this.body = Bodies.circle(x, y, r, {
      restitution: 1.0,
      density: 0.002,
      collisionFilter: {
        category: 0x0002, // Hand category
        mask: 0x0001, // Only collide with regular objects
      },
    });
    Composite.add(engine.world, this.body);
  }

  draw() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    circle(0, 0, this.r);
    pop();
  }

  remove() {
    Composite.remove(engine.world, this.body);
  }
}

let framesSinceSeenPalm = 0;

window.drawModelingPhysicsScreen = async function (stateMachine, p5) {
  if (!isInitializing) await setupDrawModelingPhysicsScreen();
  if (!handLandmarker) return;

  Engine.update(engine);
  handResults = handLandmarker.detectForVideo(camera.elt, performance.now());

  clear();
  entities = entities.filter((entity) => entity.isAlive(p5));
  for (let entity of entities) {
    entity.draw();
  }

  if (
    handResults &&
    handResults.landmarks &&
    handResults.landmarks.length == 1
  ) {
    framesSinceSeenPalm = 0;

    let detectedPalm = [
      handResults.landmarks[0][0], // wrist
      //handResults.landmarks[0][5], // start of index finger
      //handResults.landmarks[0][6],
      //handResults.landmarks[0][7],
      // handResults.landmarks[0][8], // end of index finger
      handResults.landmarks[0][10], // middle of middle finger
    ].map((landmark) =>
      mediapipeCoordinatesToScreenCoordinates(landmark.x, landmark.y)
    );

    // now compute the rectangle of the palm
    const [x1, y1] = detectedPalm[0];
    const [x2, y2] = detectedPalm[1];
    const palmRadius =
      0.75 * Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const palmX = (x1 + x2) / 2;
    const palmY = (y1 + y2) / 2;

    // If we haven't detected the palm yet, create the corresponding object
    if (!palm) {
      // Only create it if we're away from the static body boundaries of the window
      const padding = 5;
      if (
        palmX > palmRadius + padding &&
        palmX < p5.width - padding &&
        palmY > palmRadius + padding &&
        palmY < p5.height - padding
      ) {
        console.log("Created palm");
        palm = new Palm(palmX, palmY, palmRadius);
      }
    } else {
      // If we have detected new palm coordinates, make the palm arrive at the new location
      const targetPosition = { x: palmX, y: palmY };
      const displacement = {
        x: targetPosition.x - palm.body.position.x,
        y: targetPosition.y - palm.body.position.y,
      };
      const distance = Math.sqrt(
        displacement.x * displacement.x + displacement.y * displacement.y
      );

      const maxSpeed = 50; // adjust this to control maximum speed
      const dampingDistance = 50; // distance at which to start slowing down
      const speedMultiplier = Math.min(1, distance / dampingDistance);

      const velocity = {
        x: (displacement.x * speedMultiplier * maxSpeed) / distance,
        y: (displacement.y * speedMultiplier * maxSpeed) / distance,
      };

      // Prevent NaN when distance is 0
      if (distance > 5) {
        Body.setVelocity(palm.body, velocity);
      } else {
        // If very close to target, stop completely
        Body.setVelocity(palm.body, { x: 0, y: 0 });
        Body.setPosition(palm.body, targetPosition);
      }
    }
  } else {
    framesSinceSeenPalm++;
  }

  if (palm && framesSinceSeenPalm > 60) {
    palm.remove();
    palm = undefined;
    console.log("Killed palm");
  }

  //if (palm) palm.draw();
};

function mediapipeCoordinatesToScreenCoordinates(mediapipeX, mediapipeY) {
  // Invert the X-axis since the camera is mirrored
  return transformPoint(
    [(1 - mediapipeX) * camera.width, mediapipeY * camera.height],
    homography
  );
}

async function setupDrawModelingPhysicsScreen() {
  clear();
  isInitializing = true;

  engine = Engine.create();
  engine.gravity.y = 0;

  // Create boundaries
  const boundaryWidth = 10;
  Composite.add(
    engine.world,
    Bodies.rectangle(width / 2, 0, width, boundaryWidth, { isStatic: true })
  );
  Composite.add(
    engine.world,
    Bodies.rectangle(width / 2, height, width, boundaryWidth, {
      isStatic: true,
    })
  );
  Composite.add(
    engine.world,
    Bodies.rectangle(0, height / 2, boundaryWidth, height, { isStatic: true })
  );
  Composite.add(
    engine.world,
    Bodies.rectangle(width, height / 2, boundaryWidth, height, {
      isStatic: true,
    })
  );

  // Create some boxes
  const boxesPerRow = 7;
  for (
    let x = width / (boxesPerRow + 1);
    x < width;
    x += width / (boxesPerRow + 1)
  ) {
    for (
      let y = height / (boxesPerRow + 1);
      y < height;
      y += height / (boxesPerRow + 1)
    ) {
      entities.push(new Box(x, y, 16, 16));
    }
  }

  // future: change @latest to @0.10.0 and confirm it still works
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 1,
    // minHandDetectionConfidence: 0.1 //  trying to make it a bit more confident :-)
    // minHandPresenceConfidence: 0.7, // same
    // minTrackingConfidence: 0.5, // same ;_;
  });
}
