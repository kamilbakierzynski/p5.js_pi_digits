///
let DIGITS = 5;
///

let blockSmall;
let blockBig;
let countDiv;
let counter = 0;
let collision = false;
let slider;

const timeSkip = 10 ** 6;

//For better speed
p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(windowWidth, 300);
  // Initialize blocks
  blockSmall = new Block(100, 50, 1, 0, 0);
  blockBig = new Block(250, 150, 100 ** (DIGITS - 1), 5 / timeSkip, 50);
  
  // Create collisions counter element
  countDiv = createElement('p', 'Collisions: ' + counter);
  countDiv.style("font-family:monospace; font-size:45pt; padding:10px;");
  countDiv.style('color', 'white');
  countDiv.position(20, 250);
  
  // Create real pi viewer
  piDiv = createElement('p', 'Pi: ' + PI.toFixedNoRounding(DIGITS - 1) + '...');
  piDiv.style('font-size', '22pt');
  piDiv.style('color', '#cfcfcf');
  piDiv.position(20, 0);

  // Create big block's
  massDiv = createElement('p', 'Big block\'s mass: ' + blockBig.mass.toStringWithCommas() + ' kg');
  massDiv.style('font-size', '22pt');
  massDiv.style('color', '#cfcfcf');
  massDiv.position(20, 30);

  // Create viewer for slider value
  digitsDiv = createElement('p', 'Digits to calculate: ' + DIGITS);
  digitsDiv.style('font-size', '22pt');
  digitsDiv.style('color', 'white');
  digitsDiv.position(170, 395);

  // Create slider for choosing DIGITS
  slider = createSlider(1, 9, DIGITS);
  slider.input(() => {
    DIGITS = slider.value();
    digitsDiv.html(nf('Digits to calculate: ' + DIGITS));
    piDiv.html(nf('Pi: ' + PI.toFixedNoRounding(DIGITS - 1) + '...'));
    massDiv.html(nf('Big block\'s mass: ' + (100 ** (DIGITS - 1)).toStringWithCommas() + ' kg'));
    massFunFactsDiv.html(nf(`How to imagine ${(100 ** (DIGITS - 1)).toStringWithCommas()} kg?<br>` + 
    "<br>" + `Boeing 747-400: ${(100 ** (DIGITS - 1)/183500).toStringWithCommasNoSlice()} times the weight.` +
    "<br>" + `RMS Titanic: ${(100 ** (DIGITS - 1)/(52310 * 1000)).toStringWithCommasNoSlice()} times the weight.` +
    "<br>" + `Great Wall of China: ${(100 ** (DIGITS - 1)/(58095 * 1000 * 1000)).toStringWithCommasNoSlice()} times the estimated weight.`));
  });
  slider.position(20, 430);
  slider.style('color', 'white');

  // Create button for Reset
  let resetButton = createButton('Reset');
  resetButton.mousePressed(reset);
  resetButton.position(20, 480);
  resetButton.style("font-family:monospace; font-size:45pt; padding:10px;")

  // Create element with mass comparision
  massFunFactsDiv = createElement('p', `How to imagine ${(100 ** (DIGITS - 1)).toStringWithCommas()} kg?<br>` + 
  "<br>" + `Boeing 747-400: ${(100 ** (DIGITS - 1)/183500).toStringWithCommasNoSlice()} times the weight.` +
  "<br>" + `RMS Titanic: ${(100 ** (DIGITS - 1)/(52310 * 1000)).toStringWithCommasNoSlice()} times the weight.` +
  "<br>" + `Great Wall of China: ${(100 ** (DIGITS - 1)/(58095 * 1000 * 1000)).toStringWithCommasNoSlice()} times the estimated weight.`);
  massFunFactsDiv.style('font-size', '22pt');
  massFunFactsDiv.style('color', 'grey');
  massFunFactsDiv.position(20, 600);
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
  countDiv.html(nf('Collisions: ' + counter.toStringWithSpaces()));
}

function reset() {
  DIGITS = slider.value();
  counter = 0;
  blockSmall = new Block(100, 50, 1, 0, 0);
  blockBig = new Block(250, 150, 100 ** (DIGITS - 1), 5 / timeSkip, 50);
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

 Number.prototype.toStringWithCommas = function() {
  return this.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -2);
 }

 Number.prototype.toStringWithSpaces = function() {
   return this.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$& ').slice(0, -2);
 }

 Number.prototype.toStringWithCommasNoSlice = function() {
  return this.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,');
 }