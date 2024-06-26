global.Phaser = require("phaser");
import bg from "../assets/Free/Background/Green.png";
import idle from "../assets/Free/personaggi/frog/idle.png";
import run from "../assets/Free/personaggi/frog/run.png";
import runl from "../assets/Free/personaggi/frog/runleft.png";
import fall from "../assets/Free/personaggi/frog/fall.png";
import dead from "../assets/Free/personaggi/dead.png";
import ground from "../assets/Free/Terrain/grass.png";
import block2 from "../assets/Free/Terrain/block-1.png";
import slab from "../assets/Free/Terrain/slab.png";
import Saw from "../assets/Free/Traps/Saw/chainON.png";
import spike from "../assets/Free/Traps/Spikes/spike.png";
import Spikedball from "../assets/Free/Traps/SpikedBall/SpikedBall.png";
import trampolino from "../assets/Free/Traps/Trampoline/trampolino.png";
import hitbox from "../assets/hitbox.png";
import trampolinoIdle from "../assets/Free/Traps/Trampoline/trampidle.png";
import cherries from "../assets/Free/Items/Fruits/Cherries.png";
import end from "../assets/Free/Items/Checkpoints/End/End.png";
import checkpoint from "../assets/Free/Items/Checkpoints/Checkpoint/checkpoint.png";

var player;
var speed2 = -50;
var speed3 = 50;
var cheat = "";
var platforms;
var Deaths;
if (localStorage.getItem("morti") == null) {
  localStorage.setItem("morti", 0);
}
if (localStorage.getItem("y-1") == null) {
  localStorage.setItem("y-1", 550);
}
if (localStorage.getItem("x-1") == null) {
  localStorage.setItem("x-1", 20);
}
var morti = localStorage.getItem("morti");
var spikes;
var fps;
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
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false,
      fps: 60,
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
  this.load.image("hitbox", hitbox);
  this.load.image("ground", ground);
  this.load.image("end", end);
  this.load.image("block2", block2);
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
  this.load.spritesheet("cherries", cherries, {
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
  // cheat check
  if (localStorage.getItem("hitbox") == 1) {
    Phaser.Physics.Arcade.StaticBody.prototype.drawDebug =
      Phaser.Physics.Arcade.Body.prototype.drawDebug;
    this.physics.world.createDebugGraphic(true);
    cheat = "on";
  } else {
    cheat = "off";
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
    platforms.create(i, 390, "ground");
  }

  // spike
  spikes = this.physics.add.staticGroup();

  for (let i = 115; i < 455; i += 15) {
    spikes.create(i, 577, "spike");
  }
  spikes.create(490, 350, "spike");
  spikes.create(510, 350, "spike");
  spikes.create(650, 577, "spike");
  //slab
  platforms.create(649, 500, "slab");
  platforms.create(500, 480, "slab");
  platforms.create(500, 360, "slab");
  platforms.create(380, 450, "slab");
  platforms.create(160, 405, "slab");
  //blocchi
  //   platforms.create(300, 560, "block2");
  //   platforms.create(300, 520, "block2");
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
    frames: this.anims.generateFrameNumbers("fall", { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, spikes, hitspike, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  // cherries
  this.cherries = this.physics.add.staticGroup();
  this.cherries.create(200, 550, "cherries");
  this.cherries.create(350, 550, "cherries");
  this.cherries.create(260, 380, "cherries");
  this.time.addEvent({
    delay: 3000,
    callback: () => {
      this.cherries.create(200, 550, "cherries");
      this.cherries.create(350, 550, "cherries");
      this.cherries.create(260, 380, "cherries");
    },
    loop: true,
  });

  this.physics.add.collider(platforms, this.cherries);
  this.physics.add.overlap(player, this.cherries, collect, null, this);
  // END
  this.end = this.physics.add.staticGroup();
  this.end.create(10, 355, "end").setScale(0.5).refreshBody().setSize(20, 30);
  this.physics.add.overlap(player, this.end, nextlvl, null, this);

  // trampolino

  this.trampolino = this.physics.add.staticSprite(750, 567, "tramp");
  // this.trampolino = this.physics.add.staticSprite(220, 300, "fan2");
  this.physics.add.collider(platforms, this.trampolino);
  this.physics.add.collider(player, this.trampolino, hittrampolino, null, this);
  // Saw

  this.Saw = this.physics.add.sprite(500, 420, "Saw").setSize(20, 22);
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

  fps = this.add.text(20, 16, Math.round(game.loop.actualFps) + " FPS", {
    fontSize: "1.2rem",
    fill: "#000",
    fontFamily: "Arial",
  });

  Deaths = this.add.text(680, 16, morti + " Deaths", {
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
    localStorage.getItem("x-1") == null ||
    localStorage.getItem("x-1") == undefined ||
    localStorage.getItem("x-1") == ""
  ) {
  } else {
    const positionX = JSON.parse(localStorage.getItem("x-1"));
    const positionY = JSON.parse(localStorage.getItem("y-1"));
    player.setX(positionX);
    player.setY(positionY);
  }
}

function update() {
  // Bg move
  this.bg.tilePositionX += 0.6;
  this.bg.tilePositionY -= 0.6;
  //saw
  this.Saw.setVelocityY(speed);
  this.Saw.setX(500);
  let controls = localStorage.getItem("gamekey");
  let space = localStorage.getItem("spacebar");
  // Player movement

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
  } else if (controls == "wad") {
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
    if (
      localStorage.getItem("x-1") != null &&
      localStorage.getItem("x-1") != 20
    ) {
      localStorage.setItem("x-1", 20);
    }
    if (
      localStorage.getItem("y-1") != null &&
      localStorage.getItem("y-1") != 380
    ) {
      localStorage.setItem("y-1", 550);
    }
    if (
      localStorage.getItem("x-1") == 20 &&
      localStorage.getItem("y-1") == 380
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
  morti++;
  localStorage.setItem("morti", morti);
  if (localStorage.getItem("x-1") == 20 && localStorage.getItem("y-1") == 380) {
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
function collect(player, cherries) {
  cherries.disableBody(true, true);

  //  Add and update the score
  // score += 10;
  // scoreText.setText("Score: " + score);
}
function removecollect(spike, cherries) {
  cherries.disableBody(true, true);
}
function nextlvl() {
  if (cheat == "on") {
  } else {
    window.location.href = window.location.origin + "/level2.html";
  }
}
