class Block {
  constructor(x, size, mass, velocity, constraint) {
    this.x = x;
    this.y = height - size;
    this.size = size;
    this.mass = mass;
    this.velocity = velocity;
    this.counter = 0;
    this.constraint = constraint;
    this.collision = false;
  }

  move() {
    this.x = this.x - this.velocity;
    if (this.x <= 0 && !this.collision) {
      this.x = 0;
      this.counter = this.counter + 1;
      this.velocity = -(this.velocity);
      return true;
      // clack.play();
    }
    return false;
  }

  checkForBounce(block) {
    if (this.x <= block.x + block.size) {
      newVelocity(block, this);
      block.x = this.x - block.size - 1;
      this.counter = this.counter + 1;
      this.collision = true;
      return true;
      // clack.play();
    } else {
      this.collision = false;
      return false;
    }
  }
  

  display() {
    if (this.size === 50) {
      textSize(18);
      fill(255);
      text(this.mass + " kg", max(this.x, this.constraint), this.y - 10);
      image(panda, max(this.x, this.constraint), this.y, this.size, this.size);
    } else {
      textSize(18);
      fill(255);
      text('100^' + Math.log10(this.mass) / 2 + " kg", max(this.x, this.constraint), this.y - 10);
      image(bear, max(this.x, this.constraint), this.y, this.size, this.size);
    }
  }
}

const newVelocity = (blockSmall, blockBig) => {
  let v1, v2;
  const m1 = blockSmall.mass;
  const m2 = blockBig.mass;
  const u1 = blockSmall.velocity;
  const u2 = blockBig.velocity;
  
  v1 = (((m1 - m2)/(m1 + m2)) * u1) + (((2 * m2)/(m1 + m2)) * u2);
  v2 = (((2 * m1)/(m1 + m2)) * u1) + (((m2 - m1)/(m1 + m2)) * u2);
  
  blockSmall.velocity = v1;
  blockBig.velocity = v2;
}
