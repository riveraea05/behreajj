// All sound files created with:
// http://www.bfxr.net/

var bump;
var hit;
var paddleStrike;
var pit;

var score = 0;
var brickRows = 8;
var brickCols = 10;
var ball;
var paddle;
bricks = [];
var scoreFont;

function preload() {
  // If you run a local copy of the index.html file in Chrome or Safari, you will
  // receive an error because there are security features in place which prevent
  // this font from being loaded.
  // scoreFont = loadFont('assets/SourceCodePro-Regular.ttf');
  bump = loadSound('assets/bump1.wav');
  hit = loadSound('assets/explosion1.wav');
  paddleStrike = loadSound('assets/paddle.wav');
  pit = loadSound('assets/pit.wav');
    
}

function setup() {
  createCanvas(420, 420);
  background(32);
  noStroke();
  noCursor();
  rectMode(RADIUS);
  ellipseMode(RADIUS);

  ball = new Ball();
  paddle = new Paddle();

  for (var row = 0; row < brickRows; ++row) {
    for (var col = 0; col < brickCols; ++col) {
      var c = color(map(col, 0, brickCols, 255, 0), map(row, 0, brickRows, 0, 255), map(col, 0, brickCols, 0, 255));
      bricks.push(new Brick(row, col, c));
    }
  }

  if (scoreFont != null) {
    textFont(scoreFont);
  }
  textSize(48);
}

function draw() {
  background(32,32,32);

  paddle.move();

  var size = bricks.length;
  for (var i = size - 1; i >= 0; --i) {
    if (ball.hitBrick(bricks[i])) {
      break;
    }
  }

  ball.move();
  ball.fallInPit();
  ball.hitCeiling();
  ball.hitPaddle(paddle);
  ball.bounceSideWalls();

  ball.show();
  paddle.show();
  size = bricks.length;
  for (var i = size - 1; i >= 0; --i) {
    bricks[i].show(i);
  }

  fill(255);
  text(score, 10, 52);
}