// Declare Variables
let items = [];
let size = 13;
let cellSize = (screen.height - 450)/size;
console.log(cellSize)
let snake = {
  len: 3,
  pos: [
    // make a list of ordered pairs, tail -> head
    [1, Math.floor(size/2)],
    [2, Math.floor(size/2)],
    [3, Math.floor(size/2)]
  ],
  dir: [1,0],
  eating: false,
  dead: false
}
let gameStarted = false;
let inputQueue = [];
let newPos = [];
let applePos = [size-3,Math.floor(size/2)]
// Functions
function generateBoard() {
  // empties the live version of the board
  items = [];
  // creates the board
  for (var i = 0; i < size; i++) {
    // adds a new row to the board with a single item
    items.push(["⬛"])
    // adds the rest of the items to the row
    for (var n = 1; n < size; n++) {
      items[i][n] = "⬛";
    }
  }
}
function updateBoard() {
  // creates a new string called output
  let output = "";
  // adds to the string either the item in the board or a a line break between rows
  for (var n = 0; n < items.length; n++) {
    for (var i = 0; i < items[n].length; i++) {output += items[n][i]}
    output += "<br>"
  }
  // sets the html display to the string we created
  document.getElementById("demo").innerHTML = output;
}
function drawSnake() {
  // loops through the snake's ordered pairs and sets the value at the corresponding spot on the board to a snake block
  for (var i = 0; i < (snake.pos.length); i++) {
    items[snake.pos[i][1]][snake.pos[i][0]] = "⬜";
  }
}
function updateSnakePos() {
  if (snake.dead == false) {
    // set the new head position to newPos
    snake.pos.push(newPos)
    // if the snake isn't eating, we want to get rid of the tail block
    if (snake.eating == false) {
      snake.pos = snake.pos.slice(1);
    }
    // this makes sure we don't grow indefinitely after eating
    snake.eating = false;
  }
}
function generateApple() {
  // this loop runs until the apple does not exist inside the snake
  for (var i = 0; items[applePos[1]][applePos[0]] == "⬜"; i++) {
    // if this is the first time this loop runs on this iteration of the function, a point is rewarded to the player
    if (i == 0) {snake.len++; snake.eating = true; document.getElementById("score").innerHTML = "~ " + (snake.len - 3) + " ~";}
    // makes random x and y positions for the apple
    applePos[0] = [Math.floor(size*Math.random())]
    applePos[1] = [Math.floor(size*Math.random())]
  }
  // sets the value of the board at the apple's position to an apple block
  items[applePos[1]][applePos[0]] = "🟦";
}
function gameTick() {
  // this if statement is designed so that it only runs if the player is ready to start
  if (gameStarted == true || inputQueue.length > 0) {
    // if this is the first time this code has ever been ran, this ensures that the game continues to run smoothly
    gameStarted = true;
    // if there's a new input, we set the current direction to whatever the most recent input is
    if (inputQueue.length > 0) {
      snake.dir = inputQueue[0];
      // this code may look a little strange, but all this does is sets the queue to itself besides item 0
      inputQueue = inputQueue.slice(1);
    }
    // we define a new snake position based on the previous one and the direction, assigning it to newPos
    newPos = [snake.pos[snake.pos.length-1][0] + snake.dir[0], snake.pos[snake.pos.length-1][1] + snake.dir[1]]
    // probably ought to check the wall collision so we can display a proper death message
    checkWallCollision();
    // now that we sorta know if it's dead or not, we can move the snake
    updateSnakePos();
  }
  generateBoard();
  checkSelfCollision();
  drawSnake();
  generateApple();
  updateBoard();
  // if the snake isn't dead, we want to have another game tick an eighth of a second later. if it is, we want to display a restart text
  if (snake.dead == false) {
    setTimeout(() => {gameTick();}, 125);
  } else {
    document.getElementById("restart").innerHTML = "~ press space to restart ~";
  }
}
function checkWallCollision() {
  if(size <= newPos[0] || 0 > newPos[0] || size <= newPos[1] || 0 > newPos[1]) {
    snake.dead = true
  }
}
function checkSelfCollision() {
  // makes an array called r that contains all unique values of our snake's position
  let r = snake.pos.filter((t={},a=>!(t[a]=a in t)));
  // if the length of the snake isn't what it should be, kill the snake
  if (r.length != snake.pos.length) {
    // kills snake
    snake.dead = true;
    // creates a dummy variable to put the head's position in, fixes rightwards-overflow bug
    let dummyVar = snake.pos.pop();
  }
}
// starts the game ticks
document.getElementById("demo").style.fontSize = cellSize + "px";
gameTick();
