var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var cycles, cycle1, cycle2,cycle3;
var track, cycle1_img, cycle2_img ,cycle3_img;

function preload(){
  track = loadImage("../images/track.jpg");
  cycle1_img = loadImage("../images/cycle_1.png");
  cycle2_img = loadImage("../images/cycle_2.png");
  cycle3_img = loadImage("../images/cycle_3.png");
  ground = loadImage("../images/ground.png");  
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start(); 
}

function draw(){
  
  if(playerCount === 3){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}