import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

import KalmanFilter2D from "./kalman2d.js";

let handLandmarker;

let handResults;

let isInitializing = false;

let kalmanFilter;

let indexKfX, indexKfY;

window.drawWaitingForCalibrationAcceptanceScreen = async function (
  stateMachine,
  p5
) {
  clear();

  // We can't do anything if handLandMarker isn't initialized yet,
  // BUT we only want to call setupDrawWaitingForCalibrationAcceptanceScreen
  // exactly once.
  // future: some kind of "loading" indicator here?
  if (!handLandmarker) {
    if (!isInitializing) {
      isInitializing = true;
      await setupDrawWaitingForCalibrationAcceptanceScreen();
    }
    return;
  }

  // Use Kalman filter to de-noise index finger? or save that for drawing?
  // Maybe also render the camera still? With dots on the detected fingers?

  // Don't render the camera feed because we don't want the hands in the feed
  // to be seen by mediapipe
  // Display the camera feed, centered in the window
  /*
  const cameraX = Math.floor((p5.width - camera.width) / 2);
  const cameraY = Math.floor((p5.height - camera.height) / 2);
  push();
  // Flip the camera so it's mirrored (if you raise your left hand while
  // looking at the camera, the hand on the left part of the screen will raise)
  scale(-1, 1);
  image(camera, -Math.floor((p5.windowWidth + camera.width) / 2), cameraY);
  pop();
  */

  // It's expensive to try to detect the markers
  // so only do this once every 5 frames
  if (p5.frameCount % 5 == 0) {
    let startTimeMs = performance.now();
    handResults = handLandmarker.detectForVideo(camera.elt, startTimeMs);

    if (
      handResults &&
      handResults.landmarks &&
      handResults.landmarks.length > 0
    ) {
      if (!kalmanFilter) {
        const [x, y] = mediapipeCoordinatesToScreenCoordinates(
          handResults.landmarks[0][8].x,
          handResults.landmarks[0][8].y
        );
        kalmanFilter = new KalmanFilter2D({
          initialState: [x, y, 0, 0], // Index finger position
          processNoise: 1.0, // Lower values = smoother but more laggy
          measurementNoise: 0.1, // Higher values = trust measurements less
          dt: 1 / 12, // this happens every 1/12 a second (5 frames)
        });
      } else {
        kalmanFilter.predict();
        [indexKfX, indexKfY] = kalmanFilter.update(
          mediapipeCoordinatesToScreenCoordinates(
            handResults.landmarks[0][8].x,
            handResults.landmarks[0][8].y
          )
        );
        console.log(indexKfX, indexKfY);
      }
    } else {
      kalmanFilter = null;
    }
  }

  if (kalmanFilter && indexKfX) {
    fill("green");
    circle(indexKfX, indexKfY, 10);
  }

  if (handResults) {
    if (handResults.landmarks) {
      for (const landmarks of handResults.landmarks) {
        for (let [i, landmark] of landmarks.entries()) {
          noStroke();
          fill(100, 150, 210);
          if (i == 8) {
            fill("red");
            // I'm using this to test out how accurate landmark.z is
            // Current findings: it's decent when the hand is a larger portion of the camera feed,
            // but if it's far away it's too noisy to be usable.
            // console.log(landmark.z);
          }
          const [x, y] = mediapipeCoordinatesToScreenCoordinates(
            landmark.x,
            landmark.y
          );
          circle(x, y, 10);
        }
      }
    }
  }
};

function mediapipeCoordinatesToScreenCoordinates(mediapipeX, mediapipeY) {
  // Invert the X-axis since the camera is mirrored
  return transformPoint(
    [(1 - mediapipeX) * camera.width, mediapipeY * camera.height],
    homography
  );
}

async function setupDrawWaitingForCalibrationAcceptanceScreen() {
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
    numHands: 2,
    minHandDetectionConfidence: 0.1, //  trying to make it a bit more confident :-)
    minHandPresenceConfidence: 0.7, // same
    minTrackingConfidence: 0.5, // same ;_;
  });
}
