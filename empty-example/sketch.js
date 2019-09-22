var board;

function setup(){
  frameRate(10); //testing needed
  createCanvas(screen.width, screen.height); //fullscreen
  board = new Grid();
  board.size = 10;
  x1 = new X(50, 50);  //this is hideous, better code?
  x2 = new X();
  x3 = new X();
  x4 = new X();
  x5 = new X();
  o1 = new O();
  o2 = new O();
  o3 = new O();
  o4 = new O();
  o5 = new O();
  var xPieces = [x1, x2, x3, x4, x5];
  var oPieces = [o1, o2, o3, o4, o5];
  var controlX = 0;
  var controlO = 0;
}

function draw(){
  background(255);
  board.display();
  board.move();
//  x1.display();
//  xPieces.display(); //could this work? or need to display separately? could create while loop to make it easier to increase # of pieces
//  yPieces.display(); //and this? maybe display().apply(yPieces)?
/**
  xPieces[controlX].keyPressedX();
  if(keyCode === 81 || keyCode === 69){ //81 = Q and 69 = E
    controlX += 1;
  }
  oPieces[controlO].keyPressedO();
  if(keyCode === 16){ //shift-right
    controlO += 1;
  }
  **/
}

//board class, have tried it as function and class, multiple iterations below, none will display even an ellipse
class Grid{
  constructor(size, x, y){
    this.size = size;
    this.x = x;
    this.y = y;
  }
  display(){
    ellipse(10, 10, this.size, this.size);
    /**

    **/
  }
  move(){ //should make sure board never leaves canvas and moves in random increments <= 5 in x and y directions
    if(this.x < screen.width - this.size/2 - 5) {
      this.x += Math.floor(Math.random() * 6);
      return this.x;
    }
    else if(this.x > this.size/2 + 5){
      this.x -= Math.floor(Math.random() * 6);
      return this.x;
    }
    if(this.y < screen.height - this.size/2 - 5) {
      this.y += Math.floor(Math.random() * 6);
      return this.y;
    }
    else if(this.y > this.size/2 +5){
      this.y -= Math.floor(Math.random() * 6);
      return this.y;
    }
  }
}
/**
  this.size = size;
  this.display = function(){
    ellipse(50, 50, this.size, this.size);
  }
**/
/**
class Grid(){
  constructor(size){
    this.s = size;
    this.cells = []; //don't really understand how this works, array?
    this.cSize = (width - 1)/this.s
  }
  display(){
    let cSize = this.cSize;
    this.cells.forEach(function(element){
      rect(element.x = 0, element.y = 0, cSize, cSize);
    });
  }
}
**/

class X{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  display(){
    return "X";
  }
}

class O{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  display(){
    return "O";
  }
}

function keyPressedX(){
  if(keyCode === UP_ARROW){
    this.y += 10;
  }
  else if(keyCode === DOWN_ARROW){
    this.y -= 10;
  }
  if(keyCode === RIGHT_ARROW){
    this.x += 10;
  }
  else if(keyCode === LEFT_ARROW){
    this.x -= 10;
  }
}

function keyPressedO(){
  if(keyCode === 87){ //87 = W, keycode.info
    this.y += 10;
  }
  else if(keyCode === 83){ //S
    this.y -= 10;
  }
  if(keyCode === 68){ //D
    this.x += 10;
  }
  else if(keyCode === 65){ //A
    this.x -= 10;
  }
}
