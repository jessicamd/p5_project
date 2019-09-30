gridSpeed = 5; //this is all for board
xDirection = 1;
yDirection = 1;
band = 250; //so doesn't overlap with game pieces' starting position

function setup(){
  frameRate(20); //testing needed
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

  q0 = new Quadrant(0, 0);
  q1 = new Quadrant(1, 0);
  q2 = new Quadrant(2, 0);
  q3 = new Quadrant(0, 1);
  q4 = new Quadrant(1, 1);
  q5 = new Quadrant(2, 1);
  q6 = new Quadrant(0, 2);
  q7 = new Quadrant(1, 2);
  q8 = new Quadrant(2, 2);
  qArray = [q0, q1, q2, q3, q4, q5, q6, q7, q8];
  iq = 0;

}

function draw(){
  createCanvas(windowWidth, windowHeight); //fullwindow
  background(255);

  board.move();
  board.display();

  x1.display();
  x2.display();
  x3.display();
  x4.display();
  x5.display();
  if(xArray !== undefined && xArray.length > 0){ //nothing to move if all objects are removed
    xArray[ix].move();
  }
  o1.display();
  o2.display();
  o3.display();
  o4.display();
  o5.display();
  if(oArray !== undefined && oArray.length > 0){
    oArray[io].move();
  }

/**
  q0.testQuadrant();
  q1.testQuadrant();
  q2.testQuadrant();
  q3.testQuadrant();
  q4.testQuadrant();
  q5.testQuadrant();
  q6.testQuadrant();
  q7.testQuadrant();
  q8.testQuadrant();
  **/
}

class Grid{
  constructor(x = 50, y = 50){
    this.x = x;
    this.y = y;
  }
  display(){
    q0.display();
    q1.display();
    q2.display();
    q3.display();
    q4.display();
    q5.display();
    q6.display();
    q7.display();
    q8.display();
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

class Quadrant{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.occupiedX = false;
    this.occupiedO = false;
    this.lowerX;
    this.lowerY;
    this.upperX;
    this.upperY;
  }
  getPosition(){
    this.lowerX = board.x + 100*this.x;
    this.lowerY = board.y + 100*this.y;
    this.upperX = board.x + 100*(this.x + 1);
    this.upperY = board.y + 100*(this.y + 1);
  }
  xInQuadrant(piece){
    this.getPosition();
    if(this.lowerX < piece.x + 25 && piece.x + 25 < this.upperX && this.lowerY < piece.y + 25 && piece.y + 25 < this.upperY){
      return true;
    }
    else{
      return false;
    }
  }
  oInQuadrant(piece){
    this.getPosition();
    if(this.lowerX < piece.x && piece.x < this.upperX && this.lowerY < piece.y && piece.y < this.upperY){
      return true;
    }
    else{
      return false;
    }
  }
  testQuadrant(){
    var i;
    for(i = 0; i < oArray.length; i++){
      if(this.oInQuadrant(oArray[i])){
        this.occupiedO = true;
        oArray[i].stuck = true;
        oArray[i].quadrant = this;
        console.log("should be stuck");
        oArray.splice(i, i + 1);
        indexCycle(io, oArray);
      }
    }
    for(i = 0; i < xArray.length; i++){
      if(this.xInQuadrant(xArray[i])){
        this.occupiedX = true;
        xArray[i].stuck = true;
        xArray[i].quadrant = this;
        xArray.splice(i, i + 1);
        indexCycle(ix, xArray);
      }
    }
  }
  display(){
    if(this.occupiedO || this.occupiedX){
      return false;
    }
    else{
      this.testQuadrant();
    }
  }
}

class X{
  constructor(x = 50, y = 50){
    this.x = x;
    this.y = y;
    this.stuck = false;
    this.quadrant;
  }
  display(){
    if(!this.stuck){
      line(this.x, this.y, 50 + this.x, 50 + this.y);
      line(this.x + 50, this.y, this.x, this.y + 50);
    }
    else{
      this.quadrant.getPosition();
      line(this.quadrant.lowerX + 25, this.quadrant.lowerY + 25, 75 + this.quadrant.lowerX, 75 + this.quadrant.lowerY);
      line(this.quadrant.lowerX + 75, this.quadrant.lowerY + 25, this.quadrant.lowerX + 25, this.quadrant.lowerY + 75);
    }
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
    this.stuck = false;
    this.quadrant;
  }
  display(){
    if(!this.stuck){
      ellipse(this.x, this.y, 2 * sqrt(1250)); //sqrt(25^2 + 25^2) is height of x's
    }
    else{
      this.quadrant.getPosition();
      ellipse((this.quadrant.lowerX + this.quadrant.upperX)/2, (this.quadrant.lowerY + this.quadrant.upperY) / 2, 2 * sqrt(1250));
    }
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

function indexCycle(i, array){
  if(i >= array.length - 1){
    i = 0;
  }
  else i += 1;
  return i;
}

function keyPressed(){
  if(keyCode === 16){
    ix = indexCycle(ix, xArray);
  }
  if(keyCode === 81 || keyCode === 69){ //Q = 81, E = 69
    io = indexCycle(io, oArray);
  }
}
