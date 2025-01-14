// future -- do we even need these, or can we grab
// the current cameraId from `camera` itself?
let cameraId =
  "e96f90f92aa58e90e3dcbd40ef8ea2620b0905f2fc390e37544060b2d4fdd8c9"; // hardcoded to my webacm for now
let cameraSelect;

let detector;
let detectedMarkers;
let markers;

window.drawCalibratingScreen = async function (stateMachine, p5) {
  if (!markers) {
    await setupCalibratingScreen(p5);
  }

  clear();

  const markerSize = markers[0].width;
  drawCalibrationMarkers(markers, markerSize, p5);

  // If the camera isn't ready yet, abort
  if (!camera || !camera.loadedmetadata) {
    return;
  }

  // Display the camera feed, centered in the window
  const cameraX = Math.floor((p5.width - camera.width) / 2);
  const cameraY = Math.floor((p5.height - camera.height) / 2);
  push();
  // Flip the camera so it's mirrored (if you raise your left hand while
  // looking at the camera, the hand on the left part of the screen will raise)
  scale(-1, 1);
  image(camera, -Math.floor((p5.windowWidth + camera.width) / 2), cameraY);
  pop();

  // Display a select box to change cameras
  cameraSelect.position(
    Math.floor((p5.width - cameraSelect.width) / 2),
    Math.floor((p5.height - camera.height) / 2) + camera.height + 5
  );

  // It's expensive to try to detect the markers (about 20ms on my laptop)
  // so only do this once every 6 frames (still ten times a second)
  if (p5.frameCount % 6 == 0) {
    detectedMarkers = detectMarkers(camera, [0, 1, 2, 3]);
  }

  // Block out the markers in the camera feed before showing it
  // So we don't "detect" the markers both in the actual screen corners,
  // and in the camera feed itself
  fill("black");
  detectedMarkers.forEach((marker) => {
    quad();
    const c = marker.corners.map((corner) =>
      markerPointToCanvasPoint(cameraX, cameraY, corner)
    );
    quad(c[0].x, c[0].y, c[1].x, c[1].y, c[2].x, c[2].y, c[3].x, c[3].y);
  });

  // Show the count of how many markers we found
  // De-duplicate by marker ID because sometimes we detect the same marker twice
  const markerIdSet = new Set(detectedMarkers.map((marker) => marker.id));
  textAlign(CENTER);
  text(
    `Found ${markerIdSet.size}/4 markers`,
    Math.floor(p5.windowWidth / 2),
    Math.floor((p5.height - camera.height) / 2) + camera.height + 150
  );

  // If we did find all four markers, compute the homography and start the next state
  if (
    markerIdSet.size === 4 &&
    [0, 1, 2, 3].every((id) => markerIdSet.has(id))
  ) {
    setHomography(
      detectedMarkers,
      markers[0].width,
      p5.windowWidth,
      p5.windowHeight,
      p5
    );
    cameraSelect.remove();
    stateMachine.waitForCalibrationAcceptance();
  }
};

async function setupCalibratingScreen(p5) {
  // Uses markers and detectedMarkers globals
  markers = getCalibrationMarkers(Math.floor(p5.windowHeight * 0.15));
  detectedMarkers = [];

  // This is a surprisingly expensive operation, so we only do it once
  detector = new AR.Detector({ dictionaryName: "ARUCO_4X4_1000" });

  // Create a camera select box and update it when cameras are added or removed
  await createNewCameraSelectBox();
  navigator.mediaDevices.addEventListener(
    "devicechange",
    createNewCameraSelectBox
  );
}

async function createNewCameraSelectBox() {
  // Uses camera, cameraSelect, cameraId globals

  if (cameraSelect) {
    cameraSelect.remove();
  }
  cameraSelect = await getCameraSelectBox(cameraId);

  cameraId = await getCameraSelectBoxId(cameraSelect);
  // future: I see something called 'elt.flipped.false' in the camera object
  // could I turn this on and save myself a ton of pain???
  camera = await createCapture(VIDEO, { video: { deviceId: cameraId } });

  cameraSelect.changed(async () => {
    cameraId = await getCameraSelectBoxId(cameraSelect);
    camera = await createCapture(VIDEO, { video: { deviceId: cameraId } });
  });
}

function setHomography(
  detectedMarkers,
  markerSize,
  windowWidth,
  windowHeight,
  p5
) {
  // Find the top-left corner of the top-left marker (ID 0),
  // the top-right corner of the top-right marker (ID 1), etc.
  const detectedCorners = [
    detectedMarkers.find((marker) => marker.id === 0).corners[0],
    detectedMarkers.find((marker) => marker.id === 1).corners[1],
    detectedMarkers.find((marker) => marker.id === 2).corners[2],
    detectedMarkers.find((marker) => marker.id === 3).corners[3],
  ];

  const cornersOnCamera = detectedCorners.map((corner) => [corner.x, corner.y]);

  // The corners of the markers are actually offset a bit from the edges of screen
  // (they have a white edge around them), so estimate the width of this edge
  // by dividing their size by eight
  const padding = Math.floor(markers[0].width / 8);
  const screenCorners = [
    [padding, padding],
    [windowWidth - padding, padding],
    [windowWidth - padding, windowHeight - padding],
    [padding, windowHeight - padding],
  ];

  homography = computeHomography(cornersOnCamera, screenCorners);
}

function drawCalibrationMarkers(markers, markerSize, p5) {
  // Draw the markers on the four corners of the screen

  const markerCoords = [
    [0, 0],
    [p5.windowWidth - markerSize, 0],
    [p5.windowWidth - markerSize, p5.windowHeight - markerSize],
    [0, p5.windowHeight - markerSize],
  ];
  markers.forEach((marker, i) => {
    const x = markerCoords[i][0];
    const y = markerCoords[i][1];
    image(marker, x, y);
  });
}

function markerPointToCanvasPoint(cameraX, cameraY, point) {
  // Given the position of a marker corner on the camera feed,
  // and the position of the camera feed on the canvas
  // Return the position of the marker corner on the canvas

  // future: this probably doesn't need to be its own function anymore
  // and can be inlined
  return {
    x: cameraX + point.x,
    y: cameraY + point.y,
  };
}

async function getCameraSelectBox(cameraId) {
  // Create a selectbox with the available cameras
  // If cameraId is already set, make that camera the default option.

  const cameras = await getCameras();
  let selectBox = createSelect();
  cameras.forEach((camera) => {
    selectBox.option(camera.label);
  });

  const selectedId = cameraId || cameras[0].deviceId;
  const matchingCameras = cameras.filter(
    (camera) => camera.deviceId === selectedId
  );
  const selectedLabel =
    matchingCameras.length == 1 ? matchingCameras[0].label : cameras[0].label;
  selectBox.selected(selectedLabel);

  return selectBox;
}

async function getCameraSelectBoxId(selectBox) {
  // Given a camera selectbox, get the ID of the selected camera

  const cameras = await getCameras();
  return cameras.find((camera) => camera.label === selectBox.selected())
    .deviceId;
}

async function getCameras() {
  // Get the available cameras

  await navigator.mediaDevices.getUserMedia({ video: true });
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === "videoinput");
}

function getCalibrationMarkers(marker_size) {
  // Get Aruco marker images with IDs 0, 1, 2, 3

  return [
    loadImage(getMarkerSvgUri(0, marker_size)),
    loadImage(getMarkerSvgUri(1, marker_size)),
    loadImage(getMarkerSvgUri(2, marker_size)),
    loadImage(getMarkerSvgUri(3, marker_size)),
  ];
}

function getMarkerSvgUri(id, size = 200, dictionary = "ARUCO_4X4_1000") {
  // Given a marker ID, get the SVG for that marker in data URI format

  const markerDict = new AR.Dictionary(dictionary);
  const svg = markerDict.generateSVG(id);

  // Resize it (thanks Claude!)
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = doc.querySelector("svg");
  svgElement.setAttribute("width", size);
  svgElement.setAttribute("height", size);
  const serializer = new XMLSerializer();
  const resizedSvg = serializer.serializeToString(svgElement);

  return "data:image/svg+xml;base64," + btoa(resizedSvg);
}

function detectMarkers(video, ids) {
  // Given a video feed, identify any markers in it with the provided IDs
  // Default to filtering to a list of IDs because otherwise there are
  // lots of false positives in the detected markers list

  // Create an ImageData object that js-aruco2 can use
  video.loadPixels();
  const flippedPixels = new Uint8ClampedArray(video.pixels.length);

  // Flip the image horizontally
  // future: we could skip this if we instead flipped the Aruco markers
  // that we were showing themselves!
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const sourcePos = (y * video.width + x) * 4;
      const targetPos = (y * video.width + (video.width - 1 - x)) * 4;
      flippedPixels[targetPos] = video.pixels[sourcePos]; // R
      flippedPixels[targetPos + 1] = video.pixels[sourcePos + 1]; // G
      flippedPixels[targetPos + 2] = video.pixels[sourcePos + 2]; // B
      flippedPixels[targetPos + 3] = video.pixels[sourcePos + 3]; // A
    }
  }

  const imageData = new ImageData(flippedPixels, video.width, video.height);

  return detector.detect(imageData).filter((marker) => marker.id in ids);
}
