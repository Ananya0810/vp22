
var food


var gameState="hungry"
function preload()
{
dogHappy=loadImage("images/dogImg1.png")
dogSad=loadImage("images/dogImg.png")
bgImg=loadImage("images/bg.png")
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