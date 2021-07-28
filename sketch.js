const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var time;
var hour;
var bg = "sunrise.png";


async function preload() {
 await   getBackgroundImg();
    
}

function setup(){
    var canvas = createCanvas(1200,700);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    if (backgroundImg!=null){ background(backgroundImg);}

    Engine.update(engine);

    fill("black");
    textSize(30);
    //hour=getBackgroundImg();
    console.log (hour);
    if(hour>=12){
        text("Time : "+ hour%12 + " PM", 50,100);
    }else if(hour==0){
        text("Time : 12 AM",100,100);
    }else{
        text("Time : "+ hour%12 + " AM", 50,100);
    }

}

async function getBackgroundImg(){

    var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   // console.log (response); 

    var jsonResponse= await response.json();
   // console.log (jsonResponse);

    //console.log (jsonResponse.datetime);
    var dateTime= jsonResponse.datetime;
    var time= dateTime.slice (11,13);
    hour= time;
    

    
    if(time>=0 && time<16 ){
        bg = "sunrise.png";
    }
    else{
        bg="sunset.png"
    }
    
    backgroundImg = loadImage(bg);
    return  time;
}
