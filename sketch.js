gridSpeed = 5; //this is all for board
xDirection = 1;
yDirection = 1;
band = 250; //so doesn't overlap with game pieces' starting position

function setup(){
  //frameRate(10); //testing needed
  //createCanvas(windowWidth, windowHeight); //fullwindow
  board = new Grid(0, 250);

  x1 = new X();
  x2 = new X(150);
  x3 = new X(250);
  x4 = new X(350);
  x5 = new X(450);
  xArray = [x1, x2, x3, x4, x5];
  ix = 0;

  o1 = new O(75, 150);
  o2 = new O(175, 150);
  o3 = new O(275, 150);
  o4 = new O(375, 150);
  o5 = new O(475, 150);
  oArray = [o1, o2, o3, o4, o5];
  io = 0;

}

function draw(){
  createCanvas(windowWidth, windowHeight); //fullwindow
  background(255);

  board.display();
  board.move();

  x1.display();
  x2.display();
  x3.display();
  x4.display();
  x5.display();
  xArray[ix].move();

  o1.display();
  o2.display();
  o3.display();
  o4.display();
  o5.display();
  oArray[io].move();

}

class Grid{
  constructor(x = 50, y = 50){
    this.x = x;
    this.y = y;
  }
  display(){
    line(this.x + 100, this.y, this.x + 100, this.y + 300);
    line(this.x + 200, this.y, this.x + 200, this.y + 300);
    line(this.x, this.y + 100, this.x + 300, this.y + 100);
    line(this.x, this.y + 200, this.x + 300, this.y + 200);
  }
  move(){
    if(this.y > height - 300 - gridSpeed){
      yDirection = -1;
    }
    if(this.y < gridSpeed + band){
      yDirection = 1;
    }
    this.y += gridSpeed * yDirection;
    if(this.x > width - 300 - gridSpeed){
      xDirection = -1;
    }
    if(this.x < gridSpeed){
      xDirection = 1;
    }
    this.x += gridSpeed * xDirection;
  }
}

class X{
  constructor(x = 50, y = 50){
    this.x = x;
    this.y = y;
  }
  display(){
    line(this.x, this.y, 50 + this.x, 50 + this.y);
    line(this.x + 50, this.y, this.x, this.y + 50);
  }
  move(){
    if(keyIsDown(UP_ARROW) && this.y >= 10){ //87 = W, keycode.info
      console.log("yay!");
      this.y -= 10;
    }
    else if(keyIsDown(DOWN_ARROW) && this.y <= height - 50 - 10){ //S
      this.y += 10;
    }
    if(keyIsDown(RIGHT_ARROW) && this.x <= width - 50 - 10){ //D
      this.x += 10;
    }
    else if(keyIsDown(LEFT_ARROW) && this.x >= 10){ //A
      this.x -= 10;
    }
  }
}

class O{
  constructor(x = 50, y = 50){
    this.x = x;
    this.y = y;
  }
  display(){
    ellipse(this.x, this.y, 2 * sqrt(1250)); //sqrt(25^2 + 25^2) is height of x's
  }
  move(){
    if(keyIsDown(87) && this.y >= sqrt(1250) + 10){ //87 = W, keycode.info
      console.log("yay!");
      this.y -= 10;
      console.log(this.y);
    }
    else if(keyIsDown(83) && this.y <= height - sqrt(1250) - 10){ //S
      this.y += 10;
    }
    if(keyIsDown(68) && this.x <= width - sqrt(1250)){ //D
      this.x += 10;
    }
    else if(keyIsDown(65) && this.x >= sqrt(1250)){ //A
      this.x -= 10;
    }
  }
}

function keyPressed(){
  if(keyCode === 16){
    if(ix >= xArray.length - 1){
      ix = 0;
    }
    else ix += 1;
  }
  if(keyCode === 81 || keyCode === 69){ //Q = 81, E = 69
    if(io >= oArray.length - 1){
      io = 0;
    }
    else io += 1;
  }
}
