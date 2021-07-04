
var food
var bedroomImg,gardenImg,washroomImg

var gameState="hungry"
function preload()
{
dogHappy=loadImage("images/dogImg1.png")
dogSad=loadImage("images/dogImg.png")
bgImg=loadImage("images/bg.png")

bedroomImg=loadImage("images/Bed Room.png")
gardenImg=loadImage("images/Garden.png")
washroomImg=loadImage("images/Wash Room.png")
}


function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  database.ref('food').on("value",readPosition)

  dog= createSprite(400,300,50,50)
  dog.addImage(dogSad)
  dog.scale=0.2
  milk1 = new Food()
  milk1.getfeedTime()

//writing gamestate in data base 
   database.ref('gameState').on("value",(data)=>{

    gameState=data.val()
   })
}

function draw() {  
background(bgImg)
  drawSprites();
fill("black")
textSize(30)
text("Happy Pride Month",120,130)

fill("black")
textSize(30)
text("virtual pet",306,50)

text("fedtime;"+ milk1.getfeedTime)
milk1.buttons()

currentTime=hour ()
if(currentTime==(milk1.feedtime+1)){
  milk1.updateState("playing")
milk1.garden()
}
else if( currentTime==(milk1.feedtime+2)){
  milk1.updateState("sleeping")
  milk1.bedroom()
}

else if( currentTime==(milk1.feedtime+3)){
  milk1.updateState("bathing")
  milk1.washRoom()
}

else{
  milk1.updateState("hungry")
}


if(gameState!=="hungry"){
  milk1.button1.hide();
  milk1.button2.hide();
  dog.remove()
    }
    else{
      milk1.button1.show();
  milk1.button2.show();
  dog.addImage(dogHappy)
  dog.scale=0.2

    }

    if(food===0){
      dog.addImage(dogHappy)
      dog.scale=0.2
    
    }
}
function readPosition(data){
  food=data.val()
}

function writeStock(data){
database.ref('/').set({
  food:data ,
  feedtime:hour ()
})
}