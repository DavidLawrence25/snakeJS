let items=[]
let size=13
let cellSize=(screen.height - 450)/size
console.log(cellSize)
let snake={
  len:3,
  pos:[
    [1,Math.floor(size/2)],
    [2,Math.floor(size/2)],
    [3,Math.floor(size/2)]
  ],
  dir:[1,0],
  eating:false,
  dead:false
}
let gameStarted=false;
let inputQueue=[];
let newPos=[];
let applePos=[size-3,Math.floor(size/2)]
function generateBoard(){
  items = []
  for (var i=0; i<size; i++) {
    items.push(["⬛"])
    for (var n = 1; n < size; n++) {
      items[i][n]="⬛"
    }
  }
}
function updateBoard(){
  let output=""
  for (var n=0; n<items.length; n++) {
    for (var i=0; i<items[n].length; i++) {output+=items[n][i]}
    output+="<br>"
  }
  document.getElementById("demo").innerHTML=output
}
function drawSnake(){
  for (var i=0; i<snake.pos.length; i++) {
    items[snake.pos[i][1]][snake.pos[i][0]]="⬜"
  }
}
function updateSnakePos(){
  if (snake.dead==false){
    snake.pos.push(newPos)
    if (snake.eating==false) {
      snake.pos=snake.pos.slice(1)
    }
    snake.eating=false
  }
}
function generateApple(){
  for (var i=0; items[applePos[1]][applePos[0]]=="⬜"; i++) {
    if (i==0) {snake.len++; snake.eating=true; document.getElementById("score").innerHTML="~ "+(snake.len - 3)+" ~";}
    applePos[0]=[Math.floor(size*Math.random())]
    applePos[1]=[Math.floor(size*Math.random())]
  }
  items[applePos[1]][applePos[0]]="🟦"
}
function gameTick(){
  if (gameStarted==true||inputQueue.length>0) {
    gameStarted=true
    if (inputQueue.length>0) {
      snake.dir=inputQueue[0]
      inputQueue=inputQueue.slice(1)
    }
    newPos=[snake.pos[snake.pos.length-1][0]+snake.dir[0],snake.pos[snake.pos.length-1][1]+snake.dir[1]]
    checkWallCollision()
    updateSnakePos()
  }
  generateBoard()
  checkSelfCollision()
  drawSnake()
  generateApple()
  updateBoard()
  if (snake.dead==false) {
    setTimeout(()=>{gameTick()},125)
  } else {
    document.getElementById("restart").innerHTML="~ press space to restart ~"
  }
}
function checkWallCollision(){
  if(size<=newPos[0]||0>newPos[0]||size<=newPos[1]||0>newPos[1]) {
    snake.dead=true
  }
}
function checkSelfCollision(){
  let r=snake.pos.filter((t={},a=>!(t[a]=a in t)));
  if (r.length!=snake.pos.length) {
    snake.dead=true
    let dummyVar=snake.pos.pop()
  }
}
document.getElementById("demo").style.fontSize = cellSize + "px"
gameTick()
