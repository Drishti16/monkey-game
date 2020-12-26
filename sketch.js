
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,bananaGroup
var score
var ground;
var invisibleGround;
var gameState = "play";
var bananaScore = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  
  createCanvas (400,400)
  
  monkey = createSprite(80,250,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(300,300,900,10);
  ground.velocityX = -4;
  console.log(ground.x);
  
  bananaGroup = new Group()  
  obstacleGroup = new Group()  
  
}


function draw() {
  background("green");
  fill("white");
  text("SURVIVAL TIME: "+score, 250, 20);
  text("Score: "+bananaScore,300,10);
  
  
  if (gameState === "play"){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -4;
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = "end";
    }
    
  }
  
  if (gameState === "end"){
    ground.velocityX = 0;
    
    monkey.y = 250;
    monkey.scale = 0.1;
    
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 100, 150);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 100, 200);
    
    if (keyDown("R")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      //monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = "play"; 
    }
  }
  monkey.collide(ground)
  drawSprites()
}
function bananas(){
  if (frameCount%100 === 0){
    var a = Math.round(random(120,200))
    banana = createSprite(400,a, 50, 50 )
    //banana.addAnimation("banana.png", bananaImage);
    banana.addImage(bananaImage)
    banana.scale = 0.1;
    banana.velocityX =-4;           
    banana.lifetime = 200;
    bananaGroup.add(banana);
    
  } 
}

function obstacles(){
  if (frameCount%100 === 0){
    
    obstacle = createSprite(400,290);
    //obstacle.addAnimation("rock", obstacleImage);
    obstacle.addImage(obstacleImage)
    obstacle.setCollider("circle", 0, 0, 150);
    obstacle.scale = 0.09 ;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
}
  
