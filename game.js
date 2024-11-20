// Game States
let gameState = "start"; // "start", "play", "success", "fail"

// Chicken variables
let chickenX = 10;
let chickenY = 300;
let velocity = 0; // speed of chicken's movement
let gravity = 0.5; // gravity affecting the chicken
let thrust = -10; // upward force when pressing space
let maxSafeLandingSpeed = 3.5; // Maximum safe velocity for landing

// Grass variables
let grassY = 550; // position of the ground
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
  text("🐣Rooster Lander🐔", width / 2.2, 100);

  fill(255, 255, 0);
  textSize(110);
  text("START GAME", width / 2.2, 260);

  fill(250);
  textSize(20);
  text("🪽 (Press the space bar to fly/dampen the fall) 🪽", width / 2, 330);

  fill(255);
  textSize(25);
  text("Land the rooster as smooth as possible to survive!", width / 2, 150);

  if (keyIsPressed && key === " ") {
    gameState = "play";
  }
}

// Gameplay
function playGame() {
  background(135, 206, 235); // blue sky

  fill (220, 220, 220);

  // Cloud 1
  ellipse (110,140,140,70);
  ellipse (130,150,130,70);
  ellipse (140,150,160,70);
  ellipse (40,130,140,70);
  ellipse (110,140,130,70);
  ellipse (100,120,150,70);
  ellipse (120,140,150,70);
  ellipse (30,140,150,70);

  // Cloud 2
  ellipse (500,130,150,70);
  ellipse (500,100,150,70);
  ellipse (520,120,150,70);
  ellipse (430,120,150,70);
  ellipse (500,130,150,70);
  ellipse (500,100,150,70);
  ellipse (520,120,150,70);
  ellipse (430,120,150,70);

  // Cloud 3
  ellipse (800,160,180,70);
  ellipse (800,110,140,70);
  ellipse (800,130,160,70);
  ellipse (800,140,130,70);
  ellipse (800,140,120,70);
  ellipse (800,120,180,70);
  ellipse (800,150,140,70);
  ellipse (800,130,210,70);

  // Draw grass
  fill(34, 139, 34);
  rect(0, grassY, width, grassHeight);

  // Chicken physics
  velocity += gravity;
  chickenY += velocity;

  if (keyIsDown(32)) {
    // 32 is the keycode for space bar
    velocity += thrust * 0.1; // apply upward thrust
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
  ellipse(x + 140, chickenY + 10 + wingOffset, 95, 15); 
  ellipse(x + 140, chickenY + 20 + wingOffset, 85, 10); 
  ellipse(x + 130, chickenY + 28 + wingOffset, 75.5, 8.5); 

  // left wings
  ellipse(x + 25, chickenY + 10 + wingOffset, 95, 15); 
  ellipse(x + 25, chickenY + 20 + wingOffset, 85, 10); 
  ellipse(x + 35, chickenY + 28 + wingOffset, 75.5, 8.5); 

  // cockcombs
  fill(255, 0, 0);
  ellipse(x + 60.5, chickenY + 12.5, 30, 110); 
  ellipse(x + 75, chickenY + 5, 30, 110); 
  ellipse(x + 90, chickenY, 30, 110); 

  // body
  fill(255, 255, 255); 
  ellipse(x + 82.5, chickenY, 75, 75); 
  rect(x + 45, chickenY + 5, 75, 75); 

  // chicken booty
  ellipse(x + 82.5, chickenY + 76, 75.5, 50); 

  // eyes
  fill(0, 0, 0);
  ellipse(x + 80, chickenY, 7.5, 7.5); 
  ellipse(x + 102.5, chickenY, 7.5, 7.5); 

  // beak
  fill(255, 200, 0);
  triangle(
    x + 90,
    chickenY + 38,
    x + 90,
    chickenY + 12,
    x + 127.5,
    chickenY + 25
  ); 
  ellipse(x + 92.5, chickenY + 25, 26, 26); 
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
  text("☠️Fatality, rooster down☠️", width / 2.2, 220);

  fill(255);
  textSize(30);
  text("Press 'R' to Restart", width / 2.2, 400);

  if (keyIsPressed && key === "r") {
    restartGame();
  }
}

// Restart the game
function restartGame() {
  chickenY = 10;
  chickenX = 300;
  velocity = 0;
  gameState = "start";
}
