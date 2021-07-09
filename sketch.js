const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var computer, computerBase, computerArcher;
var playerArrows = [];
var computerArrows = [];
var playerArcherLife = 1;
var computerArcherLife = 1;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );

  computerArcher = new ComputerArcher(
    width - 350,
    computerBase.body.position.y - 180,
    120,
    120
  );
  handleComputerArcher();
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC DUEL", width / 2, 100);

  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(i, playerArrows);
  }

  playerBase.display();
  player.display();
  player.life();
  computer.life();
  playerArcher.display();
  handlePlayerArrowCollision();

  for (var i = 0; i < computerArrows.length; i++) {
    showArrows(i, computerArrows);
  }

  computerBase.display();
  computer.display();
  computer.life();
  computerArcher.display();
  handleComputerArrowCollision();
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function showArrows(index, arrows) {
  arrows[index].display();


}

function handleComputerArcher() {
  if (!computerArcher.collapse && !playerArcher.collapse) {
    setTimeout(() => {
      var pos = computerArcher.body.position;
      var angle = computerArcher.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP") {
        angleValue = 0.1;
      } else {
        angleValue = -0.1;
      }
      angle += angleValue;

      var arrow = new ComputerArrow(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(computerArcher.body, angle);
      Matter.Body.setAngle(computerArcher.body, angle);

      computerArrows.push(arrow);
      setTimeout(() => {
        computerArrows[computerArrows.length - 1].shoot(angle);
      }, 100);

      handleComputerArcher();
    }, 2000);
  }
}

function handlePlayerArrowCollision() {
  for (var i = 0; i < computerArrows.length; i++) {
    

    var archerCollision = Matter.SAT.collides(
      computerArrows[i].body,
      playerArcher.body
    );

    var computerCollision = Matter.SAT.collides(
      computerArrows[i].body,
      player.body
    );

    if (
      
      archerCollision.collided ||
      computerCollision.collided
    ) {
      if ( archerCollision.collided||computerCollision.collided)
  {
    playerArcherLife-=1;
   player.reduceLife(playerArcherLife)
   if (playerArcherLife>=0)
    {
    playerArcherLife.collapse=true;
     Matter.Body.setStatic(player.body,false)
     Matter.Body.setStatic(playerArcher.body,false)
     //Matter.Body.setPosition(player.body,{x:width-100,y:player.body.position.y})     
   }
  }
    }
  }
}

function handleComputerArrowCollision() {
  for (var i = 0; i < playerArrows.length; i++) {
    

    var archerCollision = Matter.SAT.collides(
      playerArrows[i].body,
      computerArcher.body
    );

    var computerCollision = Matter.SAT.collides(
      playerArrows[i].body,
      computer.body
    );

    if (
      archerCollision.collided ||
      computerCollision.collided
    ) {
      if (archerCollision.collided||computerCollision.collided)
      {
        computerArcherLife-=1;
       computer.reduceLife(computerArcherLife)
       if (computerArcherLife>=0)
       {
         computerArcherLife.collapse=true;
         Matter.Body.setStatic(computer.body,false)
         Matter.Body.setStatic(computerArcher.body,false)
         //Matter.Body.setPosition(computer.body,{x:width-100,y:computer.body.position.y})     
       }
      }
    }
  }
}