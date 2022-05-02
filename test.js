// Declare Variables
let items = [];
let size = 13;
let snake = {
  len: 3,
  pos: [
    // make a list of ordered pairs, tail -> head
    [0, Math.floor(size/2)],
    [1, Math.floor(size/2)],
    [2, Math.floor(size/2)]
  ],
  dir: 1,
  eating: false,
  dead: false
}
let inputQueue = [];
let applePos = [size-3,Math.floor(size/2)]
// Functions
function generateBoard() {
  items = [];
  for (var i = 0; i < size; i++) {
    items.push(["⬛"])
    for (var n = 1; n < size; n++) {
      items[i][n] = "⬛";
    }
  }
}
function updateBoard() {
  let output = "";
  for (var n = 0; n < items.length; n++) {
    for (var i = 0; i < items[n].length; i++) {output += items[n][i]}
    output += "<br>"
  }
  document.getElementById("demo").innerHTML = output;
}
function drawSnake() {
  for (var i = 0; i < (snake.pos.length); i++) {
    items[snake.pos[i][1]][snake.pos[i][0]] = "⬜";
  }
}
function generateApple() {
  for (var i = 0; items[applePos[1]][applePos[0]] == "⬜"; i++) {
    if (i == 0) {snake.len++; snake.eating = true; document.getElementById("score").innerHTML = "~ " + (snake.len - 3) + " ~";}
    applePos[0] = [Math.floor(size*Math.random())]
    applePos[1] = [Math.floor(size*Math.random())]
  }
  items[applePos[1]][applePos[0]] = "🟦";
}
function gameTick() {
  if (inputQueue.length > 0) {
    snake.dir = inputQueue[0];
    inputQueue = inputQueue.slice(1);
  }
  if (snake.dir == 0) {
    snake.pos.push([snake.pos[(snake.pos.length)-1][0], snake.pos[(snake.pos.length)-1][1] - 1])
  } else if (snake.dir == 1) {
    snake.pos.push([snake.pos[(snake.pos.length)-1][0] + 1, snake.pos[(snake.pos.length)-1][1]])
  } else if (snake.dir == 2) {
    snake.pos.push([snake.pos[(snake.pos.length)-1][0], snake.pos[(snake.pos.length)-1][1] + 1])
  } else {
    snake.pos.push([snake.pos[(snake.pos.length)-1][0] - 1, snake.pos[(snake.pos.length)-1][1]])
  }
  if (snake.eating == false) {
    snake.pos = snake.pos.slice(1);
  }
  snake.eating = false;
  generateBoard();
  drawSnake();
  generateApple();
  checkCollisions();
  updateBoard();
  if (snake.dead == false) {
    setTimeout(() => {gameTick();}, 125);
  }
}
function checkCollisions() {
  let r = snake.pos.filter((t={},a=>!(t[a]=a in t)));
  if (r.length - (snake.pos.length) == 0 && size > snake.pos[snake.pos.length - 1][0] && snake.pos[snake.pos.length - 1][0] >= 0) {
    snake.dead = false
  } else {snake.dead = true}
}
gameTick();
