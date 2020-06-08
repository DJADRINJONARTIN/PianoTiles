let cols = rows = 4;
let w, h;

let clicks = false;
let alive = true;
let score = 0;

let tiles = [];

let sounds = [];

function preload() {
  sounds[0] = loadSound("DO.mp3");
  sounds[1] = loadSound("RE.mp3");
  sounds[2] = loadSound("MI.mp3");
  sounds[3] = loadSound("FA.mp3");
  sounds[4] = loadSound("SOL.mp3");
  sounds[5] = loadSound("LA.mp3");
  sounds[6] = loadSound("SI.mp3");
  sounds[7] = loadSound("DO'.mp3");
}

function setup() {
  // put setup code here
  createCanvas(400, 600);
  w = floor(width / cols),
    h = floor(height / rows);

  for (let i = 0; i < rows; i++) {
    tiles[i] = new Tile(i * h);
  }
}

function draw() {
  if (alive) {
    // put drawing code here
    background("#9ACBF8");

    for (tile of tiles) {
      if (clicks) {
        tile.y += map(score, 0, 70, 3, 10);
        if (tiles[3].y > height) {
          gameOver();
        }
      }
      tile.show();
    }

    for (let i = 1; i < cols; i++) {
      push();
      stroke(255);
      strokeWeight(5);
      line(i * w, 0, i * w, height);
      pop();
    }

    push();
    fill(255);
    stroke("red");
    strokeWeight(10);
    textSize(35);
    text(`${score}`, width / 2 - 17.5, 50);
    pop();
  }
}

function mousePressed() {
  if (mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height) {
    if (

      mouseX >= tiles[3].x &&
      mouseX <= tiles[3].x + w &&
      mouseY >= tiles[3].y &&
      mouseY <= tiles[3].y + h

    ) {
      tiles.pop();
      tiles = [new Tile(tiles[0].y - h), ...tiles];
      clicks = true;
      score++;
      let randNum = floor(random(0, sounds.length - 1));
      sounds[randNum].play();
    } else {
      gameOver();
    }
  } else {
    gameOver();
  }
}

class Tile {
  constructor(y) {
    this.x = round(random(0, 3)) * w;
    this.y = y;
    this.speed = score * 3 + 3;
  }

  show() {
    fill(0);
    stroke(255);
    rect(this.x, this.y, w, h);
  }
}

function keyPressed() {
  if (!alive) {
    if (key === "r") {
      reset();
    }
  }
}



function gameOver() {
  alive = false;
  clicks = false;
  if (!alive) {
    // tiles = undefined;
    background("red");
    fill(255);
    noStroke();
    textSize(32);
    textAlign(CENTER);
    text("GAME OVER!\nYour final score was:" + score, width / 2, height / 2);
    textSize(10);
    text("Refresh to start over!", width / 2, height - 50);
    noLoop();
  }
}