// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor(x, y, lineSize, direction) {
    this.x = random(x, x + lineSize);
    this.y = y; //random(0, height);
    this.r = random(1, 15);
    this.xSpeed = random(-1, 1);
    this.ySpeed = direction * random(0, 5);
    this.isAlive = true;
    this.alpha = 1;
    this.sizeChange = random(0.1, 0.5);
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    fill(`rgba(234, 110, 15, ${this.alpha})`);
    circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    let degrade = random(0.01, 0.05);
    this.alpha -= degrade;
    // this.r -= this.sizeChange;
    if (this.x < 0 || this.x > width) this.isAlive = false;
    if (this.y < 0 || this.y > height) this.isAlive = false;
    if (this.alpha < 0) this.isAlive = false;
    if (this.r < 0) this.isAlive = false;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 85) {
        stroke("rgba(255,255,255,0.04)");
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

// // an array to add multiple particles
// let particles = [];

export default Particle;
