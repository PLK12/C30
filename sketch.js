const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var myEngine;
var myWorld;

var ground;
var rope;

var fruit;

var fruit_cons;

var bunny;

var backgroundImg, fruitImg, bunnyImg;

var button;


function preload()
{
  backgroundImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  bunnyImg = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  myEngine = Engine.create();
  myWorld = myEngine.world;
 
  button  = createImg('cut_btn.png');
  button.position(240, 40)
  button.size(50, 50);
  button.mouseClicked(drop)

  bunny = createSprite(250,610,50,50);
  bunny.addImage(bunnyImg);
  bunny.scale = 0.2;
  
  ground = new Ground(250,690,500,10);

  rope = new Rope(6,{x: 250, y:40});
  
  var fruitoptions =
  {
    density:0.001,
  };
  fruit = Matter.Bodies.circle(250,300,15,fruitoptions);

  
  Matter.Composite.add(rope.body, fruit);

  fruit_cons = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);


}

function draw() 
{
  background(51);

 image(backgroundImg, width/2, height/2 ,500, 700)

  Engine.update(myEngine);
  
  
  ground.display();
  rope.show();

 // ellipse(fruit.position.x,fruit.position.y,15, 15);
 //image(fruitImg,fruit.position.x-30,fruit.position.y-30,60, 60);
  
  //edges cases 
  if(fruit!= null)
  {
    image(fruitImg,fruit.position.x,fruit.position.y,60, 60);
  }
  

 
 drawSprites();
}


function drop()
{
    //1. detach the fruit, 2. break the rope. 3. fruit gets removed from the rope 
  rope.break();
  fruit_cons.detach();
  fruit_cons = null; 

}




