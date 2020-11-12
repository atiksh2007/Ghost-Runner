var tower;
var towerimage;
var ghost;
var ghostimage;
var doors;
var doorsimage;
var doorsgroup;
var climber;
var climberimage;
var climbergroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var invisiblebar;
var invisiblegroup;
var score;
var sound;
function preload(){
  towerimage=loadImage("tower.png");
  ghostimage=loadImage("ghost-standing.png");
  doorsimage=loadImage("door.png");
  climberimage=loadImage("climber.png")
  sound=loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300);
  tower.addImage("display",towerimage);
  ghost=createSprite(300,300);
  ghost.addImage("add",ghostimage);
  ghost.scale=0.4;
  ghost.depth=2;
  doorsgroup=new Group();
  climbergroup=new Group();
  invisiblegroup=new Group();
  score=0;
}
function draw(){
  background("black");
  if(gameState===PLAY){
    sound.play();
  tower.velocityY=3;
  
  if(keyDown("space")){
ghost.velocityY=-5
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+2
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-2;
  }
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0;
    score=score+10;
    
  }
  ghost.velocityY=ghost.velocityY+0.8;
 
  if(tower.y>600){
     tower.y=300;
  }  
  spawndoors();
    if(invisiblegroup.isTouching(ghost)||ghost.y>600){
      gameState=END;
    }
  }
  else if(gameState===END){
    sound.stop();
    climbergroup.destroyEach();
    doorsgroup.destroyEach();
  ghost.destroy();
    tower.destroy();
    invisiblegroup.destroyEach();
    stroke("yellow");
    textSize(30);
    text("GAME OVER",200,300)
    stroke("yellow");
    textSize(30);
    text("Score:"+score,230,350)
  }
  drawSprites();
}
function spawndoors(){
  if(frameCount%150===0){                                       
  var rand=Math.round(random(100,500));
  doors=createSprite(rand,0);
    doors.velocityY=3;
    doors.depth=1;
  doors.addImage(doorsimage);
  doors.lifetime=600;
  doorsgroup.add(doors);
  climber=createSprite(rand,50);
    climber.velocityY=3;
    climber.depth=1.5;
    climber.lifetime=600;
    climber.addImage(climberimage);
    climbergroup.add(climber);
    invisiblebar=createSprite(rand,60,70,5);
    invisiblebar.visible=false;
    invisiblebar.velocityY=3;
    invisiblebar.lifetime=600;
    invisiblegroup.add(invisiblebar);
  }
}