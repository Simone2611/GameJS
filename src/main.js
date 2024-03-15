global.Phaser = require("phaser");

import bg from "../assets/Free/Background/Blue.png";
import idle from "../assets/Free/personaggi/rosa/idle.png";
import run from "../assets/Free/personaggi/rosa/run.png";
import runl from "../assets/Free/personaggi/rosa/runleft.png";
import fall from "../assets/Free/personaggi/rosa/fall.png";
import dead from "../assets/Free/personaggi/dead.png";
import ground from "../assets/Free/Terrain/grass.png";
import block1 from "../assets/Free/Terrain/block-1.png";
import slab from "../assets/Free/Terrain/slab.png";
import Saw from "../assets/Free/Traps/Saw/chainON.png";
import spike from "../assets/Free/Traps/Spikes/spike.png";
import Spikedball from "../assets/Free/Traps/SpikedBall/SpikedBall.png";
import trampolino from "../assets/Free/Traps/Trampoline/trampolino.png";
import trampolinoIdle from "../assets/Free/Traps/Trampoline/trampidle.png";
import apple from "../assets/Free/Items/Fruits/Apple.png";
import end from "../assets/Free/Items/Checkpoints/End/End.png";
import checkpoint from "../assets/Free/Items/Checkpoints/Checkpoint/checkpoint.png";
var player;
var platforms;
var Deaths;
var cheat = "";
var spikes;
var fps;
if (localStorage.getItem("morti") == null) {
  localStorage.setItem("morti", 0);
}
var morti = localStorage.getItem("morti");
var cursors;
var speed = -100;
var score = 0;
var scoreText;
var keyA;
var keyD;
var keyW;
var keyR;
var keySpace;
var keyEsc;
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("bg", bg);
  this.load.image("ground", ground);
  this.load.image("end", end);
  this.load.image("block1", block1);
  this.load.image("spike", spike);
  this.load.image("Spikedball", Spikedball);
  this.load.image("trampolinoIdle", trampolinoIdle);
  this.load.image("slab", slab);
  this.load.spritesheet("checkpoint", checkpoint, {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("idle", run, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("apple", apple, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("fall", fall, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("runl", runl, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("idletrue", idle, {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("dead", dead, {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("Saw", Saw, {
    frameWidth: 38,
    frameHeight: 38,
  });
  this.load.spritesheet("tramp", trampolino, {
    frameWidth: 28,
    frameHeight: 28,
  });
}

function create() {
  //cheat check
  if (localStorage.getItem("hitbox") == 1) {
    Phaser.Physics.Arcade.StaticBody.prototype.drawDebug =
      Phaser.Physics.Arcade.Body.prototype.drawDebug;
    this.physics.world.createDebugGraphic(true);
    cheat = "on";
  } else {
    cheat = "off";
  }
  if (localStorage.getItem("x") != null && localStorage.getItem("x") != 20) {
    localStorage.setItem("x", 20);
  }
  if (localStorage.getItem("y") != null && localStorage.getItem("y") != 380) {
    localStorage.setItem("y", 550);
  }
  // Background

  this.bg = this.add.tileSprite(400, 300, 800, 600, "bg");
  // Platform

  platforms = this.physics.add.staticGroup();
  //grass
  platforms.create(20, 600, "ground");

  for (let i = 50; i < 850; i += 30) {
    platforms.create(i, 600, "ground");
  }
  for (let i = 0; i < 150; i += 40) {
    platforms.create(i, 430, "ground");
  }

  // spike
  spikes = this.physics.add.staticGroup();
  for (let i = 228; i < 380; i += 15) {
    spikes.create(i, 577, "spike");
  }

  for (let i = 400; i < 530; i += 15) {
    spikes.create(i, 577, "spike");
  }

  spikes.create(510, 377, "spike");
  spikes.create(300, 407, "spike");
  spikes.create(250, 407, "spike");
  spikes.create(200, 407, "spike");

  spikes.create(-3, 350, "spike");
  spikes.create(13, 350, "spike");

  spikes.create(-3, 290, "spike");
  spikes.create(13, 290, "spike");

  spikes.create(190, 278, "spike");
  spikes.create(460, 290, "spike");
  spikes.create(570, 277, "spike");
  spikes.create(710, 280, "spike");
  spikes.create(640, 157, "spike");
  spikes.create(210, 77, "spike");
  // Spikedball
  spikes.create(455, 520, "Spikedball").setCircle(15).refreshBody();

  spikes.create(610, 210, "Spikedball").setCircle(15).refreshBody();

  spikes.create(550, 100, "Spikedball").setCircle(15).refreshBody();

  spikes.create(550, 27, "Spikedball").setCircle(15).refreshBody();

  spikes.create(450, 80, "Spikedball").setCircle(15).refreshBody();
  spikes
    .create(620, 395, "Spikedball")
    .setCircle(15)
    .setScale(0.85)
    .refreshBody();

  //slab
  platforms.create(700, 450, "slab");
  platforms.create(750, 400, "slab");
  platforms.create(550, 413, "slab");
  platforms.create(350, 425, "slab");
  platforms.create(10, 360, "slab");
  platforms.create(10, 300, "slab");
  platforms.create(450, 300, "slab");
  platforms.create(580, 310, "slab");
  platforms.create(700, 290, "slab");
  platforms.create(800, 200, "slab");
  platforms.create(0, 100, "slab");
  //blocchi
  platforms.create(200, 560, "block1");
  platforms.create(382, 560, "block1");
  platforms.create(300, 430, "block1");
  platforms.create(250, 430, "block1");
  platforms.create(200, 430, "block1");
  platforms.create(520, 560, "block1");
  platforms.create(520, 400, "block1");
  platforms.create(180, 300, "block1");
  platforms.create(570, 300, "block1");
  platforms.create(650, 180, "block1");
  platforms.create(280, 100, "block1");
  platforms.create(200, 100, "block1");
  //player Creation - Animation
  player = this.physics.add.sprite(20, 550, "idle");
  player.setSize(15, 27, true);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("runl", { start: 5, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "fermo",
    frames: this.anims.generateFrameNumbers("idletrue", { start: 0, end: 10 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "fall",
    frames: this.anims.generateFrameNumbers("fall", { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, spikes, hitspike, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  // apple

  this.apple = this.physics.add.staticGroup();
  this.apple.create(300, 300, "apple");
  this.apple.create(440, 390, "apple");
  this.apple.create(720, 230, "apple");
  this.apple.create(600, 120, "apple");
  this.apple.create(500, 120, "apple");
  this.apple.create(400, 120, "apple");
  this.apple.create(100, 120, "apple");
  this.time.addEvent({
    delay: 3000,
    callback: () => {
      this.apple.create(300, 300, "apple");
      this.apple.create(440, 390, "apple");
      this.apple.create(720, 230, "apple");
      this.apple.create(600, 120, "apple");
      this.apple.create(500, 120, "apple");
      this.apple.create(400, 120, "apple");
      this.apple.create(100, 120, "apple");
    },
    loop: true,
  });
  this.physics.add.collider(platforms, this.apple);
  this.physics.add.overlap(player, this.apple, collect, null, this);

  // END
  this.end = this.physics.add.staticGroup();
  this.end.create(9, 78, "end").setScale(0.5).refreshBody().setSize(20, 30);
  this.physics.add.overlap(player, this.end, nextlvl, null, this);
  // Checkpoint
  this.checkpoint = this.physics.add
    .staticSprite(20, 391, "checkpoint")
    .setScale(0.6)
    .refreshBody()
    .setSize(20, 20);
  this.anims.create({
    key: "flag",
    frames: this.anims.generateFrameNumbers("checkpoint", { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.overlap(player, this.checkpoint, checkpointsave, null, this);
  // trampolino

  this.trampolino = this.physics.add.staticSprite(600, 567, "tramp");
  // this.trampolino = this.physics.add.staticSprite(220, 300, "fan2");
  this.physics.add.collider(platforms, this.trampolino);
  this.physics.add.collider(player, this.trampolino, hittrampolino, null, this);
  // Saw

  this.Saw = this.physics.add.sprite(300, 550, "Saw").setSize(20, 22);
  this.anims.create({
    key: "rotate",
    frames: this.anims.generateFrameNumbers("Saw", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  this.Saw.play("rotate", this);

  this.physics.add.collider(platforms, this.Saw, () => {
    speed = speed * -1;
  });
  this.physics.add.collider(player, this.Saw, hitspike, null, this);

  //score
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "1.2rem",
    fill: "#000",
    fontFamily: "Arial",
  });

  fps = this.add.text(730, 16, Math.round(game.loop.actualFps) + " FPS", {
    fontSize: "1.2rem",
    fill: "#000",
    fontFamily: "Arial",
  });
  Deaths = this.add.text(600, 16, morti + " Deaths", {
    fontSize: "1.2rem",
    fill: "#000",
    fontFamily: "Arial",
  });

  // WASD
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  if (
    localStorage.getItem("x") == null ||
    localStorage.getItem("x") == undefined ||
    localStorage.getItem("x") == ""
  ) {
  } else {
    const positionX = JSON.parse(localStorage.getItem("x"));
    const positionY = JSON.parse(localStorage.getItem("y"));
    player.setX(positionX);
    player.setY(positionY);
  }
}

function update() {
  // Bg move
  this.bg.tilePositionX -= 0.2;
  this.bg.tilePositionY -= 0.1;
  //saw
  this.Saw.setVelocityY(speed);
  let controls = localStorage.getItem("gamekey");
  let space = localStorage.getItem("spacebar");
  // Player movement
  this.checkpoint.anims.play("flag", true);
  if (controls == "arrow") {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else if (!player.body.touching.down) {
      player.setVelocityX(0);

      player.anims.play("fall", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("fermo", true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-270);
    }
  } else {
    if (keyA.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (keyD.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else if (!player.body.touching.down) {
      player.setVelocityX(0);

      player.anims.play("fall", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("fermo", true);
    }

    if (keyW.isDown && player.body.touching.down) {
      player.setVelocityY(-270);
    }
  }
  if (space == "on") {
    if (keySpace.isDown && player.body.touching.down) {
      player.setVelocityY(-270);
    }
  }

  if (keyR.isDown) {
    score = 0;
    if (localStorage.getItem("x") != null && localStorage.getItem("x") != 20) {
      localStorage.setItem("x", 20);
    }
    if (localStorage.getItem("y") != null && localStorage.getItem("y") != 380) {
      localStorage.setItem("y", 550);
    }
    localStorage.setItem("morti", morti);
    if (
      localStorage.getItem("x-2") == 20 &&
      localStorage.getItem("y-2") == 380
    ) {
      player.setX(20);
      player.setY(380);
    } else {
      player.setX(20);
      player.setY(550);
    }
  }

  fps.setText(Math.round(game.loop.actualFps) + " FPS");
  Deaths.setText(morti + " Deaths");
}

function hitspike(player, spikes) {
  score = 0;
  morti++;
  localStorage.setItem("morti", morti);
  localStorage.setItem("morti", morti);
  if (localStorage.getItem("x-2") == 20 && localStorage.getItem("y-2") == 380) {
    player.setX(20);
    player.setY(380);
  } else {
    player.setX(20);
    player.setY(550);
  }
}

function hittrampolino(player, fan) {
  this.anims.create({
    key: "trampolino",
    frames: this.anims.generateFrameNumbers("tramp", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: 0,
  });

  this.trampolino.play("trampolino", this);
  player.setVelocityY(-400);
}
function collect(player, apple) {
  apple.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText("Score: " + score);
}
function removecollect(spike, apple) {
  apple.disableBody(true, true);
}
function nextlvl() {
  if (cheat == "on") {
  } else {
    window.location.href = window.location.origin + "/level1.html";
  }
}

function checkpointsave() {
  localStorage.setItem("x", 20);
  localStorage.setItem("y", 380);
}
