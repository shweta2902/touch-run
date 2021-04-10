var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,boyImg2,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var endSprite, endSpriteImg;
var resetBtn,resetBtnImg
var start,startImg

var left,right,center;
var leftImg,rightImg,centerImg

//Game States
var SERVE=2
var PLAY=1;
var END=0;
var gameState=2;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  boyImg1 =loadAnimation("Runner-1.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  endSpriteImage = loadImage("Danger!.png")
  resetBtnImg = loadImage("reset image.png")
  leftImg = loadAnimation("sideImages.png")
  rightImg = loadAnimation("sideImages.png")
  centerImg = loadAnimation("sideImages.png")
  startImg = loadAnimation("start button.png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height);
path.addImage(pathImg);



//creating boy running
boy = createSprite(0.5 * width,height - 70,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("SahilRunning2",boyImg2);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  boy.setCollider("circle",0,0,650)
  //boy.debug = true

  endSprite = createSprite(0 + width * 0.5,0 + height * 0.5,10,10);
  endSprite.addImage(endSpriteImage);
  endSprite.scale = 0.4
  endSprite.visible = false
  
  resetBtn = createSprite(width/2,height - 150);
  resetBtn.addImage(resetBtnImg);
  resetBtn.scale = 0.7
  resetBtn.visible = false;
  
  left = createSprite(width/4,height/2);
  left.addAnimation("leftImage",leftImg);
  left.scale = 0.2
  left.visible = false;
  
  right = createSprite(0 + width*0.75,height/2);
  right.addAnimation("rightImage",rightImg);
  right.scale = 0.2
  right.visible = false;
  
  center = createSprite(width/2,height/2);
  center.addAnimation("centerImage",centerImg);
  center.scale = 0.2;
  center.visible = false;
  
  start = createSprite(width/2,height*0.75);
  start.addAnimation("startImage",startImg);
  start.scale = 0.3
  
}

function draw() {
  
  background("white")

      
    if(gameState === SERVE){
      textAlign(CENTER);
      textSize(20);
      fill("blue");
      fill("green")
      text("Click on the arrows to change the position!",width/2,height/2)
      
      path.visible = false
      boy.visible = false
      start.visible = true
    
  
 console.log(height/4-50)

    }
  
   
  

  if(gameState === PLAY){
    
    boy.visible = true
    left.visible = true
    right.visible = true
    center.visible = true;
    start.visible = false
    
     //start the track
    path.visible = true
    path.velocityY = 10;
    
    //resetting ground check
    if(path.y > 450 ){
    path.y = height/60;
  }
  if (touches.length > 0) {
    if (restart.overlapPoint(touches[0].x, touches[0].y)) {
      reset();
      touches = []
    }

    if (left.overlapPoint(touches[0].x, touches[0].y)) {
      boy.x = width/4
      touches = []
    }
    if (right.overlapPoint(touches[0].x, touches[0].y)) {
      boy.x = 0 + width * 0.75
      touches = []
    }
    if (center.overlapPoint(touches[0].x, touches[0].y)) {
      boy.x = width/2
      touches = []
    }

  }
  if(mousePressedOver(start) && gameState === SERVE){
    gameState = PLAY
  
  }
   // movement of boy 
  if(mousePressedOver(left)){
    boy.x = width/4
  }
     if(mousePressedOver(right)){
    boy.x = 0 + width * 0.75
  }
    
      if(mousePressedOver(center)){
    boy.x = width/2
  }

    
  edges= createEdgeSprites();
  boy.collide(edges);

  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    
    if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+50;

      
    }
    if(swordGroup.isTouching(boy)) {
        gameState = END
    }
  }
    if(gameState === END){
        boy.changeAnimation("SahilRunning2",boyImg2)
        jwelleryG.destroyEach();
        cashG.destroyEach();
        diamondsG.destroyEach();
        swordGroup.destroyEach();
        path.velocityY=0;
        endSprite.visible = true;
        resetBtn.visible = true;
      right.visible = false
      left.visible = false
      center.visible = false

      
      
        
          
      if(mousePressedOver(resetBtn)){
      
      gameState = SERVE
      
      reset();
//        console.log("this is wrong")
    }
      }
  
  
  drawSprites();  
  
  if(gameState === PLAY || gameState === END){
  textSize(20);
  fill("lightblue");
  textAlign(CENTER)
  text("Treasures collected: "+ treasureCollection,0 + width * 0.5,30);
  boy.visible = true
  }
  
  if(gameState === END){
    if(treasureCollection === 0){
      fill("lightgreen");
      textSize(20);
      textAlign(CENTER)
      text("Game Over! Bad luck, you collected only " +treasureCollection,width * 0.5,130);
      text("treasures!",width * 0.5,150);
      fill("lightblue")
      
      left.visible = false
      right.visible = false
      center.visible = false
    }
    
    if(treasureCollection > 0){
      fill("lightgreen");
      textSize(20);
      textAlign(CENTER)
      text("Game Over! Good job! You collected " +treasureCollection,width * 0.5,130);
      text("treasures!",width * 0.5,150)
      fill("lightblue")
    }
  }
}
  
function reset(){
  
  endSprite.visible = false
  resetBtn.visible = false
  path.visible = false
 // boy.visible = false
  treasureCollection = 0
  boy.changeAnimation("SahilRunning",boyImg);


  
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(width/2,-230);
    var rand =Math.round(random(1,3));
    switch(rand){
    case 1:
    cash.x = width * 0.25;
    break;
    
    case 2:
    cash.x = width * 0.5
    break;
    
    case 3:
    cash.x = width * 0.75
    break;
        
    }
    
    
    
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 10;
  cashG.add(cash);
    
//  cash.debug = true
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(width/1.5,-160);
    var rand2 = Math.round(random(1,3))
    switch(rand2){
    case 1:
    diamonds.x = 0 + width * 0.25;
    break;
    
    case 2:
    diamonds.x = 0 + width * 0.5
    break;
    
    case 3:
    diamonds.x = 0 + width * 0.75
        
    }
        
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 10;
  diamondsG.add(diamonds);
//  diamonds.debug = true
    
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(width/4,-90);
    var rand3 =Math.round(random(1,3))
    switch(rand3){
    case 1:
    jwellery.x = width * 0.25;
    break;
    
    case 2:
    jwellery.x = width * 0.5
    break;
    
    case 3:
    jwellery.x = width * 0.75
        
    }
    
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 10;
  jwelleryG.add(jwellery);
//  jwellery.debug = true
  }
}

function createSword(){
  if (World.frameCount % 200 == 0) {
  var sword = createSprite(width/2,-10);
    var rand4 = Math.round(random(1,3))
    switch(rand4){
    case 1:
    sword.x = width * 0.25;
    break;
    
    case 2:
    sword.x = width * 0.5
    break;
    
    case 3:
    sword.x = width * 0.75
        
    }
    
    
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 10;
  sword.lifetime = 150;
  swordGroup.add(sword);
  sword.debug = true
  }
}