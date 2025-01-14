# P5.js + Mediapipe + Homography

This project lets you interact with digital images (on a monitor, or projected onto a screen) with your hands.

## Set up

You need a stable camera that can be pointed at a digital screen. A laptop on its own won't work; the camera is usually part of the screen itself!

The camera and screen will go through a calibration step where they learn their relative positioning to each other, so it's important that both the camera and the screen be in stable positions.

### Laptop + external monitor

If you have an external monitor, you can connect it to your laptop and then turn the laptop so that the two screens are facing each other. Then the laptop's camera will be able to see the external monitor.

### Laptop + external camera

If you have an external camera, you can plug it into your laptop and arrange the camera so that it can see your laptop screen. Because the screen and the camera need to be in stable physical positions, you'll likely need to use a tripod or find something to rest the camera on (holding it yourself is unlikely to work, unless you're a surgeon.)

## Running the project

Open index.html in the browser of your choice. After a moment, you'll see four calibration markers appear on the corner of the screen. All four of these need to be visible to the camera feed shown in the center of the screen.

Once they're found, you should then be able to hover a hand in front of the screen and see the position of your hand drawn on the screen itself.

If you resize the screen or move the position of the screen or camera, you should restart the application so it can recalibrate.

It helps if the screen occupies as much of the camera image as possible -- if your hands are only a small portion of the camera feed (i.e., because they are far away from the camera itself), hand detection will struggle.

## Development

P5.js is used for graphics. The entrypoint for the application is `sketch.js`. P5.js will first call `setup()` and then begin calling `draw()` repeatedly, 60 times a second.

`setup()` creates a state machine, and `draw()` uses this state machine to decide what to do. The [javascript-state-machine library](https://github.com/jakesgordon/javascript-state-machine) provides a good overview of state machines.

Currently there are two states:

- `calibrating` -- `sketch.js::draw()` will call `calibrating.js::drawCalibratingScreen`
- `waitingForCalibrationAcceptance` -- `sketch.js::draw()` will call `waitingForCalibrationAcceptance.js::drawWaitingForCalibrationAcceptanceScreen`

Both of these functions take in as parameters the `stateMachine` (so they can transition the application to other states) and `p5`. `p5` is used to access globals that the P5.js library creates, like `windowWidth`, etc., in these other Javascript files since they are declared `type="module"`.

### `calibrating` state

1. Four Aruco markers are created, with IDs 0, 1, 2, and 3. These are shown at the top left, top right, bottom right, and bottom left corners of the screen, respectively. These are created as SVGs by [js-aruco2](https://github.com/damianofalcioni/js-aruco2/tree/master), and converted to a format that P5.js is comfortable with.
1. A camera feed is created and shown in the center of the screen, along with a camera selection box for if you have multiple cameras connected.
1. `js-aruco2` looks for markers with the IDs 0, 1, 2, and 3 in the camera feed. If any of these are found, their position in the camera feed is covered with a black quadrilateral. This is because we're also showing the camera feed on the screen, and we want to find only the markers in the corners of the screen, not the ones appearing in the camera feed infinity-mirror style.
1. If all four markers are found:
   1. We find the corners of the screen in the camera feed using the marker positions (e.g., the top left corner of the top left marker, the top right corner of the top right marker, etc.).
   1. We then compute the "homography" between the corners of the screen in the camera feed (which could be essentially any arbitrary position, since the screen could be anywhere within the camera feed) and the corners of the screen itself (these are the friendly digital coordinates we draw with P5.js, e.g., the top left corner of the screen is `(0, 0)`).
   1. Finally, we transition to the `drawWaitingForCalibrationAcceptanceScreen` state.

### `drawWaitingForCalibrationAcceptanceScreen` state

1. Mediapipe is initialized exactly once.
2. When Mediapipe is initialized, it starts looking for hands in the camera feed.
3. If a hand is found, the homography found earlier is used to convert the coordinates of the hand in the camera feed to the coordinates of the hand on the screen.
4. Those coordinates are then drawn on the screen (with a different color for the index finger).

In the future, this state will ask the user to accept or reject the calibration results (the homography) found in the `calibrating` state. If it's rejected, the application will go back to the `calibrating` state. If it's accepted, the application will move to a third `drawing` state (which will have the fun name `drawDrawingScreen` :-)
