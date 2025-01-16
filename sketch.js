// We make these global because multiple states need access to them
let camera;
let canvas;
let homography;

// These are global because they're used by both setup() and draw() below
let stateMachine;
let stateHandlers;

// p5.js runs this function once before calling draw(), below
async function setup() {
  // future: it would be nice to automatically re-init the app when the window
  // is resized instead of requiring the user to refresh the page
  canvas = createCanvas(windowWidth, windowHeight);

  stateHandlers = new Map([
    ["calibrating", drawCalibratingScreen],
    [
      "waitingForCalibrationAcceptance",
      drawWaitingForCalibrationAcceptanceScreen,
    ],
    ["modelingPhysics", drawModelingPhysicsScreen],
  ]);

  stateMachine = new StateMachine({
    init: "calibrating",
    transitions: [
      {
        name: "waitForCalibrationAcceptance",
        from: "calibrating",
        to: "waitingForCalibrationAcceptance",
      },
      {
        name: "modelPhysics",
        from: "waitingForCalibrationAcceptance",
        to: "modelingPhysics",
      },
      {
        name: "skipToModelingPhysics",
        from: "calibrating",
        to: "modelingPhysics",
      },
    ],
    methods: {
      onWaitForCalibrationAcceptance: function () {
        console.log("Transitioned to waitingForCalibrationAcceptance.");
      },
      onModelPhysics: function () {
        console.log("Transitioned to modelingPhysics.");
      },
      onSkipToModelingPhysics: function () {
        console.log("Transitioned to modelingPhysics");
      },
    },
  });
}

// After setup() is run, p5.js calls this 60 times per second
async function draw() {
  if (!stateMachine) {
    return;
  }

  // Run the draw function for the particular state we're in
  await stateHandlers.get(stateMachine.state)(stateMachine, window.p5.instance);
}
