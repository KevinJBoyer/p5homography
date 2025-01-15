class KalmanFilter2D {
  constructor({
    // Initial state estimate [x, y, dx, dy]
    initialState = [0, 0, 0, 0],
    // Initial state covariance (uncertainty in the state)
    initialCovariance = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    // Process noise (how much we expect the state to change between updates)
    processNoise = 0.1,
    // Measurement noise (how much we trust the sensor readings)
    measurementNoise = 1.0,
    // Time step between measurements (in seconds)
    dt = 1 / 30,
  } = {}) {
    // State vector [x, y, dx, dy]
    this.state = initialState;

    // State covariance matrix (4x4)
    this.P = initialCovariance;

    // State transition matrix
    this.F = [1, 0, dt, 0, 0, 1, 0, dt, 0, 0, 1, 0, 0, 0, 0, 1];

    // Measurement matrix (we only measure position, not velocity)
    this.H = [1, 0, 0, 0, 0, 1, 0, 0];

    // Process noise covariance matrix
    const q = processNoise;
    this.Q = [
      (q * dt ** 4) / 4,
      0,
      (q * dt ** 3) / 2,
      0,
      0,
      (q * dt ** 4) / 4,
      0,
      (q * dt ** 3) / 2,
      (q * dt ** 3) / 2,
      0,
      q * dt ** 2,
      0,
      0,
      (q * dt ** 3) / 2,
      0,
      q * dt ** 2,
    ];

    // Measurement noise covariance matrix
    const r = measurementNoise;
    this.R = [r, 0, 0, r];
  }

  // Matrix multiplication for 4x4 matrices stored as flat arrays
  multiplyMatrix(a, b, rows1, cols1, cols2) {
    const result = new Array(rows1 * cols2).fill(0);
    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < cols2; j++) {
        for (let k = 0; k < cols1; k++) {
          result[i * cols2 + j] += a[i * cols1 + k] * b[k * cols2 + j];
        }
      }
    }
    return result;
  }

  // Matrix addition for flat arrays
  addMatrix(a, b) {
    return a.map((val, i) => val + b[i]);
  }

  // Matrix subtraction for flat arrays
  subtractMatrix(a, b) {
    return a.map((val, i) => val - b[i]);
  }

  // Matrix transpose for rectangular matrices
  transposeMatrix(matrix, rows, cols) {
    const result = new Array(rows * cols);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result[j * rows + i] = matrix[i * cols + j];
      }
    }
    return result;
  }

  // Predict step
  predict() {
    // Predict state: x = Fx
    this.state = this.multiplyMatrix(this.F, this.state, 4, 4, 1);

    // Predict covariance: P = FPF' + Q
    const FP = this.multiplyMatrix(this.F, this.P, 4, 4, 4);
    const FPFt = this.multiplyMatrix(
      FP,
      this.transposeMatrix(this.F, 4, 4),
      4,
      4,
      4
    );
    this.P = this.addMatrix(FPFt, this.Q);

    return this.state.slice(0, 2); // Return predicted position
  }

  // Update step
  update(measurement) {
    // Calculate Kalman gain: K = PH'(HPH' + R)^-1
    const Ht = this.transposeMatrix(this.H, 2, 4);
    const PHt = this.multiplyMatrix(this.P, Ht, 4, 4, 2);
    const HPHt = this.multiplyMatrix(this.H, PHt, 2, 4, 2);
    const S = this.addMatrix(HPHt, this.R);

    // Simple 2x2 matrix inversion
    const det = S[0] * S[3] - S[1] * S[2];
    const Sinv = [S[3] / det, -S[1] / det, -S[2] / det, S[0] / det];

    const K = this.multiplyMatrix(PHt, Sinv, 4, 2, 2);

    // Update state: x = x + K(z - Hx)
    const Hx = this.multiplyMatrix(this.H, this.state, 2, 4, 1);
    const innovation = this.subtractMatrix(measurement, Hx);
    const correction = this.multiplyMatrix(K, innovation, 4, 2, 1);
    this.state = this.addMatrix(this.state, correction);

    // Update covariance: P = (I - KH)P
    const KH = this.multiplyMatrix(K, this.H, 4, 2, 4);
    const I_KH = this.subtractMatrix(
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      KH
    );
    this.P = this.multiplyMatrix(I_KH, this.P, 4, 4, 4);

    return this.state.slice(0, 2); // Return filtered position
  }
}

/*

// Example usage:
const kf = new KalmanFilter2D({
    initialState: [0, 0, 0, 0],          // Start at origin with zero velocity
    processNoise: 0.1,                   // Lower values = smoother but more laggy
    measurementNoise: 1.0,               // Higher values = trust measurements less
    dt: 1/30                             // 30 FPS camera
});

// In your tracking loop:
function updatePosition(rawPosition) {
    kf.predict();                        // Predict next state
    return kf.update(rawPosition);       // Update with new measurement
}

*/

export default KalmanFilter2D;
