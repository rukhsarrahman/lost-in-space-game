let mr_alien;
let space;
let start_screen;
let game_over;
let scrollSpeed = 2;
let x1 = 0,x2;
let start = 0;

function preload() {
  mr_alien = loadImage("mr_alien.png");
  space = loadImage("starry_night.jpg");
  start_screen = loadImage("start_screen.jpeg");
  game_over = loadImage("game_over.jpeg");
}



function Alien() {
  this.y = height / 2;
  this.x = 45;
  this.gravity = 0.4; 
  this.velocity = 0;
  this.lift = -10;
  this.show = function () {
    image(mr_alien, this.x, this.y, 70, 70);
  };
  this.update = function () {
    this.velocity += this.gravity; 
    this.velocity *= 0.9;
    this.y += this.velocity;
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
    this.y = 0;
    this.velocity = 0;
    }
  };



  this.fly = function () {
    this.velocity += this.lift;
  };
}



function Pillar() {
  //Function For Obstacles
  this.top = random(20, height / 2); 
  this.bottom = random(this.top + 85, height - 20); 
  this.x = width;
  this.speed = 7;



  this.show = function () {
    // Displaying Pillars
    fill(255, 204, 0);
    rect(this.x, 0, 20, this.top);
    rect(this.x, this.bottom, 20, height - this.bottom);
  };



  this.update = function () {
    this.x -= this.speed;
  };



  this.collision = function (spaceship) {
    // Function To check the Collision
    if (spaceship.y < this.top || spaceship.y > this.bottom) {
      if (spaceship.x > this.x && spaceship.x < this.x + 20)
        return true;
    }
  }
}



let spaceship;
let pillars = [];



function setup() {
  createCanvas(400, 600); 
  spaceship = new Alien();
  pillars.push(new Pillar()); 
  x2 = width;
}



function draw() {
  if (start == 0) {
    fill(0, 0, 255);
    image(start_screen, 0, 0, width, height);
  }
  if (start == 1) {
    scrollyBackground(); 
    spaceship.update();
    spaceship.show();
    textSize(20);
    fill(255);
    text("Score: " + (pillars.length - 1), 310, 30);
    if (frameCount % 80 == 0) {
      pillars.push(new Pillar());
    }
    for (let i = 0; i < pillars.length; i++) {
      pillars[i].show();
      pillars[i].update();
      if (pillars[i].collision(spaceship)) {
      image(game_over, 0, 0, width, height);
      textSize(25);
      text("Score: " + (pillars.length - 1), width / 2 - 45, 500);
      noLoop();
      }
    }
  }
}



function keyPressed() {
  if (key == " ") {
    spaceship.fly();
  }
}



function scrollyBackground() {
  image(space, x1, 0, width, height);
  image(space, x2, 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
}



function mouseClicked() {
  start = 1;
}