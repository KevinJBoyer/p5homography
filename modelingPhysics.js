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
  constructor(x, y, w, h, a) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, {
      restitution: 1.0,
      density: 0.002,
      angle: a ?? 0,
      collisionFilter: a
        ? {
            category: 0x0002, // Hand category
            mask: 0x0001, // Only collide with regular objects
          }
        : {
            category: 0x0001, // Regular object category
            mask: 0x0003,
          },
      //isStatic: a ? true : false,
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
    rotate(this.body.angle);
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
      handResults.landmarks[0][8], // end of index finger
    ].map((landmark) =>
      mediapipeCoordinatesToScreenCoordinates(landmark.x, landmark.y)
    );

    // now compute the rectangle of the palm
    const [x1, y1] = detectedPalm[0];
    const [x2, y2] = detectedPalm[1];
    const palmWidth = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const palmX = (x1 + x2) / 2;
    const palmY = (y1 + y2) / 2;
    const palmHeight = 16;
    const palmAngle = Math.atan2(y2 - y1, x2 - x1);

    // If we haven't detected the palm yet, create the corresponding object
    if (!palm) {
      console.log("Created palm");
      palm = new Box(palmX, palmY, palmWidth, palmHeight, palmAngle);
    } else {
      // If we have detected the palm, accelerated it to the new location
      const forceMultiplier = 0.01;
      const forceVector = {
        x: (palmX - palm.body.position.x) * forceMultiplier,
        y: (palmY - palm.body.position.y) * forceMultiplier,
      };
      Body.applyForce(palm.body, palm.body.position, forceVector);

      // Calculate target angle
      const targetAngle = Math.atan2(y2 - y1, x2 - x1);
      const currentAngle = palm.body.angle;

      // Calculate angular force (torque)
      const angleDiff = targetAngle - currentAngle;
      // Normalize angle difference to be between -PI and PI
      const normalizedAngleDiff =
        ((angleDiff + Math.PI) % (2 * Math.PI)) - Math.PI;
      const torque = normalizedAngleDiff * forceMultiplier;

      // Apply torque
      Body.setAngularVelocity(palm.body, palm.body.angularVelocity + torque);

      // Calculate target width and current width
      const targetWidth = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      );
      const currentWidth = palm.body.bounds.max.x - palm.body.bounds.min.x;

      // Smoothly scale the body if width changed
      if (Math.abs(targetWidth - currentWidth) > 0.1) {
        const scale = targetWidth / currentWidth;
        Body.scale(palm.body, scale, 1); // Scale only in x direction
      }
    }
  } else {
    framesSinceSeenPalm++;
  }

  if (palm && framesSinceSeenPalm > 60) {
    Composite.remove(engine.world, palm.body);
    palm = undefined;
    console.log("Killed palm");
  }

  if (palm) palm.draw();
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
