var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket, rocket_motion, rocket_collided;
var ground, groundImage;
var celing, celingImage
//var backgroundImage, background;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclesGroup2, obstacle12, obstacle22, obstacle32, obstacle42, obstacle52, obstacle62;
var music;
var score=0;

var gameOver, restart;



function preload(){
  //rocket_motion =   loadAnimation("giphy-1 (dragged).tiff","giphy-2 (dragged).tiff");
  //rocket_collided= loadAnimation("download-2.png");
  
  //backgroundImage= loadImage("Screenshot 2021-07-30 at 2.03.06 PM.png");
  

  //spaceShipImage = loadImage(".jpg");
  
  //obstacle1 = loadImage("img1.png");
  //obstacle2 = loadImage("img2.jpg");
  //obstacle3 = loadImage("img3.jpg");
  //obstacle4 = loadImage("images.jpg");
  //obstacle5 = loadImage("images-1.jpg");
  //obstacle6 = loadImage("img6.jpg");
  
  //obstacle12 = loadImage("img9.jpg");
  //obstacle22 = loadImage("img8.jpg");
  //obstacle32 = loadImage("images-1-copy.jpg");
  //obstacle42 = loadImage("img7.jpg");
  //obstacle52 = loadImage("images-copy.jpg");

  //music = loadSound("audiopreview.ogg");
  
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("reset.png");
}

function setup() {
  createCanvas(600, 500);
  
  //background = createSprite(0,0,600,500);
  //background.addImage(backgroundImage);
  //background.scale=2.5;

  rocket = createSprite(50,200,50,20);
  
  //rocket.addAnimation("flying", rocket_motion);
  //rocket.addAnimation("collided", rocket_collided);
  rocket.scale = 0.5;
  
  ground = createSprite(200,490,1200,50);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.visible = false;

  celing = createSprite(200,20,1200,20);
  celing.x = celing.width /2;
  celing.velocityX = -(6 + 3*score/100);
  celing.visible=false

  gameOver = createSprite(300,100);
  gameOver.addImage("gameover", gameOverImg);
  
  restart = createSprite(300,270);
  restart.addImage("reset", restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  obstaclesGroup = new Group();
  obstaclesGroup2 = new Group();
  
  score = 0;
}

function draw() {
  rocket.debug = true;



  background(255,100,100);


  text(mouseX+","+mouseY,mouseX,mouseY)
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/50);
    celing.velocityX = -(6 + 3*score/50);

    //music.play();
  
    if(keyDown("space")) {
      rocket.velocityY = -12;
    }
  
    rocket.velocityY = rocket.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (celing.x < 0){
      celing.x = celing.width/2;
    }


    rocket.bounceOff(ground);
    rocket.bounceOff(celing);


    spawnObstacles();
    spawnObstacles2();
  
    if(obstaclesGroup.isTouching(rocket)){
        gameState = END;
    }

    if(obstaclesGroup2.isTouching(rocket)){
      gameState = END;
  }

  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    celing.velocityX = 0;
    rocket.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup2.setVelocityXEach(0);
    
    //change the trex animation
    //rocket.changeAnimation("collided",rocket_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  

  drawSprites();
  
}
  

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,410,10,random(500,1000));
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //switch(rand) {
      //case 1: obstacle.addImage(obstacle1);
              //break;
      //case 2: obstacle.addImage(obstacle2);
              //break;
      //case 3: obstacle.addImage(obstacle3);
              //break;
      //case 4: obstacle.addImage(obstacle4);
              //break;
      //case 5: obstacle.addImage(obstacle5);
              //break;
      //case 6: obstacle.addImage(obstacle6);
              //break;
      //default: break;
    //}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



function spawnObstacles2() {
  if(frameCount % 60 === 0) {
    var obstacle2 = createSprite(600,0,10,random(500,1000));
    //obstacle.debug = true;
    obstacle2.velocityX = -(6 + 3*score/20);
    
    //generate random obstacles
    //var rand = Math.round(random(1,6));
    //switch(rand) {
      //case 1: obstacle2.addImage(obstacle12);
              //break;
      //case 2: obstacle2.addImage(obstacle22);
              //break;
      //case 3: obstacle2.addImage(obstacle32);
              //break;
      //case 4: obstacle2.addImage(obstacle42);
              //break;
      //case 5: obstacle2.addImage(obstacle52);
              //break;
      //default: break;
    //}
    
    //assign scale and lifetime to the obstacle           
    obstacle2.scale = 0.5;
    obstacle2.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle2);
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  obstaclesGroup2.destroyEach();
  
  //rocket.changeAnimation("flying",rocket_motion);
  
 
  
  score = 0;
  
}