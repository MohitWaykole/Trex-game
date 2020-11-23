var trex, trex_running, trex_collided, ground, invisibleGr, grImg, o1, o2, o3, o4, o5, o6, ob, cloud, cloudImg, score, restart, restartImg, gameO, gameOvImg, gameState, birdI, duccing_trex;

var cloudGroup, obGroup, birdGroup;

var score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  duccing_trex = loadAnimation("Dino.png");

  trex_collided = loadAnimation("trex_collided.png");

  grImg = loadImage("ground2.png");

  o1 = loadImage("obstacle1.png");

  o2 = loadImage("obstacle2.png");

  o3 = loadImage("obstacle3.png");

  o4 = loadImage("obstacle4.png");

  o5 = loadImage("obstacle5.png");

  o6 = loadImage("obstacle6.png");

  cloudImg = loadImage("cloud.png");

  gameOvImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

  grImg = loadImage("ground2.png");
  
  birdI = loadImage("Bird.png");
}

function setup() {
  createCanvas(600, 300);

  trex = createSprite(50, 260);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  gr = createSprite(300, 280, 600, 10);
  gr.addImage(grImg);

  invGr = createSprite(300, 290, 600, 10);
  invGr.visible = false;
  
  gameover = createSprite(300, 140);
  gameover.addImage(gameOvImg);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  restart = createSprite(300, 180);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  cloudGroup = new Group();
  obGroup = new Group();
  birdGroup = new Group();
  
  trex.addAnimation("collided", trex_collided);
  
  gameState = "play";   

}

function draw() {
  background(180);
  
  textSize(20);
  text("Score : " + score, 400, 50); 

  if (gameState == "play") {

    gr.velocityX = -4;
    
    score = score + Math.round(getFrameRate()/30); 

    clouds();

    if (gr.x < 0) {
      gr.x = gr.width / 2;
    }
    
    if (keyDown("space") && trex.y > 260){
      trex.velocityY = -13  
    }
    
    //console.log(trex.y);
    
    trex.velocityY = trex.velocityY + 0.7;
    
    if (obGroup.isTouching(trex) || birdGroup.isTouching(trex)) {
      gameState = "end";
    }
    
    if (score % 700 > 0 && score % 700 < 400){
      obstacles();
    }
    else{
      bird();
    }
    
    if (keyDown("down")){
      trex.changeAnimation(duccing_trex);
    }
    
  }else if (gameState == "end"){
    trex.changeAnimation("collided");
    trex.velocityY = 0;
    gr.velocityX = 0;
    birdGroup.setVelocityXEach(0);
    birdGroup.setLifetimeEach(-1);
    obGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
  }
  
  if (mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invGr);

  drawSprites();
}

function obstacles() {
  if (frameCount % 80 == 0) {
    ob = createSprite(600, 265, 20, 20);
    ob.scale = 0.5;
    var r = Math.round(random(1,6));
    switch(r){
      case 1 : ob.addImage(o1);
        break;
        
        case 2 : ob.addImage(o2);
        break;
        
        case 3 : ob.addImage(o3);
        break;
        
        case 4 : ob.addImage(o4);
        break;
        
        case 5 : ob.addImage(o5);
        break;
        
        case 6 : ob.addImage(o6);
        break;
        default : break;
    }
    ob.velocityX = -4;
    ob.lifetime = 150;
    obGroup.add(ob);
  }
}

function clouds() {
  if (frameCount % 70 == 0) {
    cl = createSprite(600, Math.round(random(120, 200)))
    cl.addImage(cloudImg);
    cl.scale = 0.5;
    cl.velocityX = -7;
    cl.lifetime = 130;
    trex.depth = cl.depth + 1;
    cloudGroup.add(cl);
  }
}

function bird(){
  if (frameCount % 80 == 0){
    br = createSprite(600, random(200, 280))
    br.addImage(birdI);
    br.scale = 0.15;
    br.velocityX = -4;
    br.lifetime = 150;
    birdGroup.add(br);
  }
}

function reset(){
  gameState = "play";
  trex.changeAnimation("running");
  obGroup.destroyEach();
  birdGroup.destroyEach();
  cloudGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  score = 0;
}