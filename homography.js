// This whole file brought to you by Claude 🙃

// When using mathjs via CDN, it exposes a global 'math' object
// No need to import as it's already available

window.computeHomography = function (srcPoints, dstPoints) {
  // Validate input points
  if (srcPoints.length !== 4 || dstPoints.length !== 4) {
    throw new Error("Exactly 4 points required for each surface");
  }

  // Create the A matrix for the homography equation
  const A = [];
  const b = []; // Create b vector alongside A matrix to ensure correspondence
  for (let i = 0; i < 4; i++) {
    const [x, y] = srcPoints[i];
    const [u, v] = dstPoints[i];

    // Each point correspondence contributes two rows to matrix A
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);

    // Add corresponding elements to b vector
    b.push(u);
    b.push(v);
  }

  // Solve the system of equations Ah = b using mathjs
  const matA = math.matrix(A);
  const vecB = math.matrix(b);

  // Use QR decomposition for better numerical stability
  const h = math.lusolve(matA, vecB);

  // Convert result to a flat array and append h[8] = 1
  const homography = [...math.flatten(h)._data, 1];

  // Reshape into 3x3 matrix
  return [
    [homography[0], homography[1], homography[2]],
    [homography[3], homography[4], homography[5]],
    [homography[6], homography[7], homography[8]],
  ];
};

/*
// Example usage:
const sourcePoints = [
  [0, 0], // top-left
  [1, 0], // top-right
  [1, 1], // bottom-right
  [0, 1], // bottom-left
];

const destinationPoints = [
  [0, 0], // top-left
  [800, 0], // top-right
  [800, 600], // bottom-right
  [0, 600], // bottom-left
];

try {
  const H = computeHomography(sourcePoints, destinationPoints);
  console.log("Homography matrix:");
  console.log(H);
} catch (error) {
  console.error("Error computing homography:", error.message);
}
*/

// Function to transform a point using the homography matrix
window.transformPoint = function (point, H) {
  const [x, y] = point;
  const w = H[2][0] * x + H[2][1] * y + H[2][2];
  const transformedX = (H[0][0] * x + H[0][1] * y + H[0][2]) / w;
  const transformedY = (H[1][0] * x + H[1][1] * y + H[1][2]) / w;
  return [transformedX, transformedY];
};
