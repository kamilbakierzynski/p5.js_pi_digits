///
let DIGITS = 5;
///

let blockSmall;
let blockBig;
let countDiv;
let counter = 0;
let collision = false;
let slider;

const timeSkip = 10 ** 4;

function setup() {
  createCanvas(windowWidth, 400);
  blockSmall = new Block(100, 50, 1, 0, 0);
  blockBig = new Block(max(windowWidth / 3, 250), 150, pow(100, DIGITS - 1), 5 / timeSkip, 50);
  
  countDiv = createElement('h2','Count: ' + counter);
  countDiv.style('font-size', '52pt');
  countDiv.style('color', 'white');
  
  piDiv = createElement('p', 'Pi: ' + PI.toFixedNoRounding(DIGITS - 1) + '...');
  piDiv.style('font-size', '22pt');
  piDiv.style('color', 'white');
  digitsDiv = createElement('p', 'Digits to calculate: ' + DIGITS);
  digitsDiv.style('font-size', '22pt');
  digitsDiv.style('color', 'white');
  slider = createSlider(1, 9, DIGITS);
  let resetButton = createButton('Reset');
  resetButton.mousePressed(reset);
  slider.input(() => {
    DIGITS = slider.value();
    digitsDiv.html(nf('Digits to calculate: ' + DIGITS));
    piDiv.html(nf('Pi: ' + PI.toFixedNoRounding(DIGITS - 1) + '...'));
  });

}

function preload() {
  clack = loadSound('clack.wav');
  panda = loadImage('panda.png');
  bear = loadImage('bear.png');
}

function draw() {
  background(10);
  collision = false;
  for (let i = 0; i < timeSkip; i++) {
    let wallBounce = blockSmall.move();
    blockBig.move();
    let collisionBounce = blockBig.checkForBounce(blockSmall);
    if (collisionBounce || wallBounce) collision = true;
  }
  if (collision) clack.play();
  counter = blockSmall.counter + blockBig.counter;
  blockSmall.display();
  blockBig.display();
  countDiv.html(nf('Count: ' + counter));
}

function reset() {
  DIGITS = slider.value();
  blockSmall = new Block(100, 50, 1, 0, 0);
  blockBig = new Block(max(windowWidth / 3, 250), 150, pow(100, DIGITS - 1), 5 / timeSkip, 50);
  
}

Number.prototype.toFixedNoRounding = function(n) {
    const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
    const a = this.toString().match(reg)[0];
    const dot = a.indexOf(".");
    if (dot === -1) {
        return a + "." + "0".repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? (a + "0".repeat(b)) : a;
 }
