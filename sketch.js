//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, knifeImage, knifeSound;
var gameover, gameoverImage, gameoverSound;
var alien, alienMoving;
var fruit, fruit1Image, fruit2Image, fruit3Image, fruit4Image;

function preload(){
  knifeImage = loadImage("knife.png");
  knifeSound = loadSound("knifeSwoosh.mp3");
  alienMoving = loadAnimation("alien1.png","alien2.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  //set the score to 0
  score = 0;

  //create fruit and monster Group variable here
  fruitGroup = createGroup();
  alienGroup = createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    aliens();
    
    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;
  
    // Increase score if knife touching fruit
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      knifeSound.play();
      score += Math.round(random(1,2));
    }
    
    // Go to end state if knife touching enemy
    if (alienGroup.isTouching(knife)) {
      gameState = 0;
      gameoverSound.play();
    }
  }
  
  if (gameState === 0) {
    
    fruitGroup.destroyEach();
    
    alienGroup.destroyEach();
    
    knife.addImage(gameoverImage);
    
    knife.x = 300;
    knife.y = 300;
    
    knife.scale = 1.5;
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits() {
  if (frameCount % 80 == 0) {
    fruit = createSprite(600,0);
  
    fruit.scale = 0.2;
  
    //fruit.debug = true;
  
    var num = Math.round(random(1,4));
    
    if(num == 1) {
      fruit.addImage(fruit1Image);
    } else if (num == 2) {
        fruit.addImage(fruit2Image);
    } else if (num == 3) {
        fruit.addImage(fruit3Image);
    } else if (num == 4) {
        fruit.addImage(fruit4Image);
    }
  
    fruit.y = Math.round(random(10,390));
  
    fruit.lifetime = 100;
  
    fruitGroup.add(fruit);
    
    var position = Math.round(random(1,2))
    
    if (position == 1) {
      fruit.x = 600;
      fruit.velocityX = -(7 + score/5);
    } else if (position == 2) {
      fruit.x = 0;
      fruit.velocityX = (7 + score/5);
    }
  }
}

function aliens() {
  if (frameCount % 300 == 0) {
    alien = createSprite(600,0);
  
    alien.scale = 1;
  
    //alien.debug = true;
    
    alien.addAnimation("alienss", alienMoving);
  
    alien.y = Math.round(random(10,390));
  
    alien.lifetime = 100;
  
    alienGroup.add(alien);
    
    var positions = Math.round(random(1,2))
    
    if (positions == 1) {
      alien.x = 600;
      alien.velocityX = -(7 + score/10);
    } else if (positions == 2) {
      alien.x = 0;
      alien.velocityX = (7 + score/10);
    }
  }
}