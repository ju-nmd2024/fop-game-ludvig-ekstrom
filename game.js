function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255, 140, 0);
}

// Game States
let gameState = "start"; // "start", "play", "success", "fail"

// Chicken variables
let chickenX = 200;
let chickenY = 300;
let velocity = 0; // speed of chicken's movement
let gravity = 0.5; // gravity affecting the chicken
let thrust = -10; // upward force when pressing space
let maxSafeLandingSpeed = 3.5; // Maximum safe velocity for landing

// Grass variables
let grassY = 580; // position of the ground
let grassHeight = 50;

// Setup function
function setup() {
  createCanvas(800, 600);
}

// Draw function
function draw() {
  if (gameState === "start") {
    drawStartPage();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "success") {
    drawSuccessPage();
  } else if (gameState === "fail") {
    drawFailPage();
  }
}

// Start Page
function drawStartPage() {
  background(0, 180, 255);

  fill(255);
  textSize(70);
  textAlign(CENTER, CENTER);
  text("🐣Rooster Lander🐔", width / 2.5, 100);

  fill(255, 255, 0);
  textSize(110);
  text("START GAME", width / 2.5, 260);

  fill(250);
  textSize(20);
  text("🪽 (Press the space bar to fly/dampen the fall) 🪽", width / 2.5, 330);

  fill(255);
  textSize(25);
  text("Land the rooster as smooth as possible to survive!", width / 2.5, 150);

  if (keyIsPressed && key === " ") {
    gameState = "play";
  }
}

// Gameplay
function playGame() {
  background(135, 206, 235); // blue sky

  // Grass
  fill(34, 139, 34);
  rect(0, grassY, width, grassHeight);

  // Chicken physics
  velocity += gravity;
  chickenY += velocity;

  if (keyIsDown(32)) {
    // Space bar
    velocity += thrust * 0.1; // Upward thrust
  }

  // Draw chicken
  drawChicken(chickenX, chickenY);

  // Check landing
  if (chickenY + 75 >= grassY) {
    if (velocity <= maxSafeLandingSpeed) {
      gameState = "success"; // smooth landing
    } else {
      gameState = "fail"; // crash
    }
  }
}

// Draw chicken
function drawChicken(x, y) {
  noStroke();

  // Body motion offsets
  let bodyOffset = sin(frameCount * 1) * 10;
  let wingOffset = sin(frameCount * 2) * 10;

  // right wings
  fill(255, 255, 255);
  ellipse(x + x + 40, chickenY + 10 + wingOffset, 95, 15);
  ellipse(x + x + 40, chickenY + 20 + wingOffset, 85, 10);
  ellipse(x + x + 40, chickenY + 28 + wingOffset, 75.5, 8.5);

  // left wings
  ellipse(x + 160, chickenY + 10 + wingOffset, 95, 15);
  ellipse(x + 160, chickenY + 20 + wingOffset, 85, 10);
  ellipse(x + 160, chickenY + 28 + wingOffset, 75.5, 8.5);

  // cockcombs
  fill(255, 0, 0);
  ellipse(x + 178, chickenY + 12.5, 30, 110);
  ellipse(x + 190, chickenY + 5, 30, 110);
  ellipse(x + x + 5, chickenY, 30, 110);

  // body
  fill(255, 255, 255); // body color
  ellipse(x + x, chickenY, 75, 75);
  rect(x + 162.5, chickenY + 5, 75, 75);

  // chicken booty
  ellipse(x + x, chickenY + 76, 75.5, 50);

  // eyes
  fill(0, 0, 0);
  ellipse(x + x + 20, chickenY, 7.5, 7.5);
  ellipse(x + x, chickenY, 7.5, 7.5);

  // beak
  fill(255, 200, 0);
  triangle(
    x + x + 50,
    chickenY + 25,
    x + x + 13,
    chickenY + 35,
    x + x + 13,
    chickenY + 15
  );
  ellipse(x + x + 13, chickenY + 25, 26, 26);
}
// Success Page
function drawSuccessPage() {
  background(0, 200, 200);

  fill(255);
  textSize(70);
  textAlign(CENTER, CENTER);
  text("🦅YOU SURVIVED🦅", 400, 220);

  textSize(200);
  text("☀️", 400, 70);

  textSize(300);
  text("🐓", 200, 460);

  fill(255);
  textSize(30);
  text("Press 'R' to Restart", width / 2, 500);

  if (keyIsPressed && key === "r") {
    restartGame();
  }
}

// Fail Page
function drawFailPage() {
  background(20, 0, 0);
  fill(255);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("☠️Fatality, rooster down☠️", width / 2.5, 220);

  fill(255);
  textSize(30);
  text("Press 'R' to Restart", width / 2.5, 400);

  if (keyIsPressed && key === "r") {
    restartGame();
  }
}

// Restart the game
function restartGame() {
  chickenY = 100;
  velocity = 0;
  gameState = "start";
}
