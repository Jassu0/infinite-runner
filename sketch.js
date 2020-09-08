//Global Variables
var PLAY = 1;
var END = 0;

var Gamestate = PLAY;
var player, playerrunning;
var rocks, rocksimage, rocksgroup;
var banana, bananaimage, bananagroup;
var invisibleground, bg, bgimage;
var gameover, gameoverimage, restart, restartimage;
var score = 0;


function preload(){
  playerrunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  rocksimage = loadImage("stone.png");
  bananaimage = loadImage("Banana.png");
  groundimage = loadImage("ground.jpg");
  bgimage = loadImage("jungle.jpg");
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  bg = createSprite(0,110,1200,300);
  bg.addImage("Jungle",bgimage);
  bg.scale = 1.0;
  //bg.x = bg.width/2;
  bg.velocityX = -3;
  
  player = createSprite(100,235,10,10);
  player.addAnimation("Running",playerrunning);
  player.scale = 0.1;
  camera.position.x = player.x;
  camera.position.y = 150;
  gameover = createSprite(100,150,30,20);
  gameover.addImage(gameoverimage);
  gameover.visible = false;
  
  restart = createSprite(300,165,30,30);
  restart.addImage(restartimage);
  restart.visible = false;
  
  invisibleground = createSprite(100,269,600,10);
  invisibleground.visible = false;
  
  rocksgroup = new Group();
  bananagroup = new Group();
  
  
}


function draw(){
 background(255); 
  
  if(bg.x < -100) {
   bg.x = 0; 
  }
 
  player.collide(invisibleground);
  
    if(bananagroup.isTouching(player)){
      bananagroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
   if(rocksgroup.isTouching(player)){ 
      player.scale=0.08;
      score=score-2;
    }
  
  
  spawnFood();
  spawnRocks();
  
  if(Gamestate == PLAY) {
     
  if(keyDown("space") && player.y >= 235) {
   player.velocityY = -10; 
  }
  player.velocityY = player.velocityY + 0.6;
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);
}

function spawnFood() {
  if(frameCount % 90 == 0) {
   banana = createSprite(600,150,10,10);
   banana.addImage(bananaimage);
   banana.scale = 0.05;
   banana.velocityX = -8;
   banana.lifetime = 100;
   bananagroup.add(banana);
  }
}
function spawnRocks() {
 if(frameCount % 80 == 0) {
   rocks = createSprite(600,260,10,10);
   rocks.addImage(rocksimage);
   rocks.scale = 0.15;
   rocks.velocityX = -6;
   rocks.lifetime = 100;
   rocksgroup.add(rocks);
 }
}


