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

var player;
var cursors;
var speed = -100;
var score = 0;
var scoreText;
var keyA;
var keyD;
var keyW;
var keySpace;
var keyEsc;
var first = true;
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
  this.load.image("block1", block1);
  this.load.image("spike", spike);
  this.load.image("Spikedball", Spikedball);
  this.load.image("trampolinoIdle", trampolinoIdle);
  this.load.image("slab", slab);
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
  this.load.spritesheet("fan", trampolino, {
    frameWidth: 28,
    frameHeight: 28,
  });
}

function create() {
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

  spikes.create(510, 377, "spike").setCircle(3).setScale(0.85);
  spikes.create(300, 407, "spike").setCircle(3).setScale(0.85);
  spikes.create(250, 407, "spike").setCircle(3).setScale(0.85);
  spikes.create(200, 407, "spike").setCircle(3).setScale(0.85);
  // Spikedball
  spikes.create(455, 520, "Spikedball").setCircle(15);
  spikes
    .create(620, 395, "Spikedball")
    .setCircle(15)
    .setScale(0.85)
    .refreshBody();

  //player Creation - Animation
  player = this.physics.add.sprite(10, 550, "idle");

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
  // apple
  for (let i = 0; i < 10; i++) {
    this.apple = this.physics.add.sprite(
      Math.floor(Math.random() * 800) + 20,
      Math.floor(Math.random() * 500) + 20,
      "apple"
    );

    this.physics.add.collider(platforms, this.apple);
    this.physics.add.overlap(player, this.apple, collect, null, this);
    this.physics.add.collider(spike, this.apple, removecollect, null, this);
    this.apple.body.offset.y = -12;
  }

  // fan

  this.fan = this.physics.add.staticSprite(600, 567, "fan");

  this.physics.add.collider(platforms, this.fan);
  this.physics.add.collider(player, this.fan, hittrampolino, null, this);
  // Saw

  this.Saw = this.physics.add.sprite(300, 550, "Saw").setCircle(16.5);
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
  // this.physics.add.collider(platforms, this.Saw, saww, null, this);

  //score
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "2rem",
    fill: "#000",
    fontFamily: "Roboto",
  });

  // WASD
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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
}

function hitspike(player, spikes) {
  score = 0;
  this.scene.restart();
}

function hittrampolino(player, fan) {
  this.anims.create({
    key: "trampolino",
    frames: this.anims.generateFrameNumbers("fan", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: 0,
  });

  this.fan.play("trampolino", this);
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
