class Player {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.image = loadImage("./assets/player.png");

    this.life1 = "green";


    World.add(world, this.body);
  }
  reduceLife(archerLife){
    if (archerLife===0) {
      this.life1="red";
    }

  }
  life() {
    push();
    textSize(20);
    fill("white");
    text("Player", 280, 40);

    fill(this.life1);
    rect(250, 50, 70, 30);

    pop();
  }

  

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
