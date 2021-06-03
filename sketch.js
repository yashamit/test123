var bgIMG , bg
var ship , ship1IMG , ship2IMG , ship3IMG , ship4IMG , ship5IMG
var score = 0
var edges
var fuelBar =100
var indiactor , indicatorIMG
var obs , obsIMG , obsGrp
var gameState = 0
var fuel , fuelGrp , fuelIMG , fuelIMG1 
var i1,i2,i3,i4,i5
var reset
var blastIMG 
var successSound , blastSound , fuelSound 

function preload(){

ship1IMG = loadImage("images/ship01.png")
ship2IMG = loadImage("images/ship03.png")
ship3IMG = loadImage("images/ship15.png")
ship4IMG = loadImage("images/ship09.png")
ship5IMG = loadImage("images/ship14.png")
bgIMG = loadImage("images/background main.jpg")
obsIMG = loadImage("images/asteroid.png")
fuelIMG = loadImage("images/fuel.png")
fuelIMG1 = loadImage("images/fuel.png")
blastIMG = loadImage("images/blast.png")

successSound = loadSound("sounds/SUCCESS.ogg")
blastSound = loadSound("sounds/EXPLOSION.ogg")
fuelSound = loadSound("sounds/FUEL.ogg")


}

function setup(){
 createCanvas(displayWidth-17 , displayHeight-105)
 edges=createEdgeSprites()

 ship = createSprite(displayWidth/2 ,displayHeight-400,50,50);
 ship.addImage(ship1IMG)

 reset = createSprite(displayWidth/2 , 150 , 70 , 25)

 obsGrp = new Group()
 fuelGrp = new Group()


 /*bg=createSprite(displayWidth/2 , displayHeight/2 , displayWidth , displayHeight)
  bg.addImage(bgIMG)
 bg.scale=4.5*/





 i1= createSprite(100,200,10,20)
 i2= createSprite(150,200,10,20)
 i3= createSprite(200,200,10,20)
 i4= createSprite(250,200,10,20)
 i5= createSprite(300,200,10,20)
 i1.addImage(fuelIMG)
 i2.addImage(fuelIMG)
 i3.addImage(fuelIMG)
 i4.addImage(fuelIMG)
 i5.addImage(fuelIMG)

}


function draw(){


  background(bgIMG);
  textSize(30)
  fill("white")
  text("Score: "+ score, 100,100);

 
  textSize(30)
  fill("white")
  text("Fuel: "+ fuelBar , 300 , 100);

 

 if(gameState ===0){
  reset.visible=false
  score = round(score + Math.round(getFrameRate()/55)/2)
  if(frameCount%60 === 0 ){
  fuelBar-=10
  }
  if(keyDown(RIGHT_ARROW)){
    ship.velocityX = 6
  }

  if(keyDown(LEFT_ARROW)){
    ship.velocityX = -6
  }

  if(score>50 && score<300){
    ship.addImage(ship2IMG)

   successSound.play()
  if(score>53){
    successSound.stop()
  }
   

   
   }
 
   if(score>450 && score<600){
     ship.addImage(ship3IMG)
     //successSound.play()

    }
 
    if(score>750 && score<900){
     ship.addImage(ship4IMG)
     //successSound.play()
    }
 
    if(score>1050 ){
     ship.addImage(ship5IMG)
     //successSound.play()
    }

    fuelIndicator()
    spawnObs()
    spawnFuel()
    ship.collide(edges)

    if(obsGrp.isTouching(ship)){
      gameState=1
   
      
      ship.addImage(blastIMG)
      ship.scale=1.5
      
      blastSound.play()
   }
   
   
   if(fuelGrp.isTouching(ship)){
     fuelGrp.destroyEach()
     fuelBar+=20
     fuelSound.play()
   }

   

   }

   

     if(gameState===1){
       
    ship.velocityX =0
    // add a blasting image for the ship
    fill("white")
    textSize(70)
    textFont("archway")
    text("GAME OVER" , displayWidth/2-200 , 100)
    
    reset.visible=true


    if(mousePressedOver(reset)){
    gameState = 0
    score=0
    obsGrp.destroyEach()
    fuelGrp.destroyEach()
     fuelBar=100
     ship.addImage(ship1IMG)   
     ship.scale=1
    }
     }
    
  drawSprites()
}

function spawnObs(){

if(frameCount%55 === 0 ){
  obs = createSprite(random(60 , displayWidth) , -30)
obs.addImage(obsIMG)
obs.scale=random(1.4 , 2.4)
obs.velocityY = 10+2*score/150
obs.lifetime = displayHeight/obs.velocityY
obsGrp.add(obs)
obs.setCollider("circle" , -15 , -10, 20 )

}
}

function spawnFuel(){
if(frameCount%100 === 0 ){
  fuel = createSprite(random(60 , displayWidth) , -30)
fuel.addImage(fuelIMG)
fuel.scale = 2
fuel.velocityY = 10
fuel.lifetime = displayHeight/fuel.velocityY
fuelGrp.add(fuel)

fuel.setCollider("rectangle" , -15 , -7, 20 , 20 )


}
}

function fuelIndicator(){
  if(fuelBar>=90){
    i5.visible=true
    i1.visible=true
    i2.visible=true
    i3.visible=true
    i4.visible=true
}
  if(fuelBar>=70&&fuelBar<90){
    i5.visible=false
    i1.visible=true
    i2.visible=true
    i3.visible=true
    i4.visible=true

}
  if(fuelBar>=50&&fuelBar <70){
    i5.visible=false
    i4.visible=false
    i1.visible=true
    i2.visible=true
    i3.visible=true
}
  if(fuelBar>=30&&fuelBar<50){
    i5.visible=false
    i4.visible=false
    i3.visible=false
    i1.visible=true
    i2.visible=true
 }
  if(fuelBar>=0 && fuelBar<30){
   
    i5.visible=false
    i4.visible=false
    i3.visible=false
    i2.visible=false
    i1.visible=true
    
 }
  
  if(fuelBar<=0 ){
    i5.visible=false
    i4.visible=false
    i3.visible=false
    i2.visible=false
    i1.visible=false
    
    gameState=1
  }

}


