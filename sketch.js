var path, car, obstacle1, obstacle2;
var pathImg, carImg, carImg2, coneImg, barrierImg;
var gameState = PLAY;
var END = 0;
var PLAY = 1;
var gameOver, restart;
var coneG, barrierG;
function preload(){
   pathImg = loadImage("Road.png");  
   carImg = loadImage("car.png");
   carImg2 = loadImage("car2.png");
   coneImg = loadImage("cone.png");
   barrierImg = loadImage("barrier.png"); 
   gameOverImg = loadImage("gameOver.png");

   
}

function setup(){
 createCanvas(1200,600);

 path=createSprite(100,150);
 path.addImage(pathImg);
 path.velocityX = -5;

 car = createSprite(70,150);
 car = addImage("running",carImg);
 car.scale = 0.08;

 car.setCollider("rectangle",0,0,40,40);

 gameOver = createSprite(650,150);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.8;
 gameOver.visible = false;

 var coneG = new Group();
 var barrierG = new Group();
}

function draw() {
   background(0);

   drawSprites();

  if(gameState === PLAY) {
      path.velocityX = -(8+2*distance/150);
      car.y = World.mouseY;

      edges = createEdgeSprites();
      car.collide(edges);

      if(path.x < 0){
        path.x = width/2;
      }
   
   var select_obstacles = Math.round(random(1,3));

   if(world.frameCount % 120 === 0){
      if(select_obstacles === 1) {
         cone();
        }else{
         barrier();      
        }

   }
   if(coneG.isTouching(car)){
      gameState = END;
      obstacle1.velocityY = 0;
      obstacle1.loadAnimation("obstacle1",carImg2);
     }
     
     if(barrierG.isTouching(car)){
       gameState = END;
       obstacle2.velocityY = 0;
       obstacle2.loadAnimation("obstacle2",carImg2);
     }
     
     
 }else if (gameState === END) {
     gameOver.visible = true;
   
     textSize(20);
     fill(255);
     text("Press Enter to Restart the game!", 500,200);
   
     path.velocityX = 0;
     car.velocityY = 0;
     car.addAnimation("running",carImg2);
   
     coneG.setVelocityXEach(0);
     coneG.setLifetimeEach(-1);
   
     barrierG.setVelocityXEach(0);
     barrierG.setLifetimeEach(-1);
   
     
     // if(keyDown("UP_ARROW")) {
     //   reset;
     // }
 
     // if(key("UP_ARROW")) {
     //   reset();
     // }
 
     // if(keyDown()) {
     //   reset();
     // }
 
      if(keyDown("enter")) {
        reset();
      }
 }
 }  
   



function cone(){
        obstacle1 =createSprite(1100,Math.round(random(50, 250)));
        obstacle1.scale =0.06;
        obstacle1.loadAnimation("cone",coneImg);
        obstacle1.setLifetime=170;
        coneG.add(obstacle1);
}

function barrier(){
        obstacle2 =createSprite(1100,Math.round(random(50, 250)));
        obstacle2.scale =0.06;        
        obstacle2.loadAnimation("barrier",barrierImg);
        obstacle2.setLifetime=170;
        barrierG.add(obstacle2);
}





function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  car.addAnimation("running",carImg);
  
  coneG.destroyEach();
  barrierG.destroyEach();
  

} 




