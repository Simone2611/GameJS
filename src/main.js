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
var player;
var cursors;
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
  // Spikedball
  spikes.create(455, 520, "Spikedball");
  spikes.create(620, 395, "Spikedball").setScale(0.85).refreshBody();

  //slab
  platforms.create(700, 450, "slab");
  platforms.create(750, 400, "slab");
  platforms.create(550, 413, "slab");
  platforms.create(350, 425, "slab");
  //blocchi
  platforms.create(200, 560, "block1");
  platforms.create(382, 560, "block1");
  platforms.create(300, 430, "block1");
  platforms.create(520, 560, "block1");
  platforms.create(520, 400, "block1");

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
  // fan

  this.fan = this.physics.add.staticSprite(600, 567, "fan");

  this.physics.add.collider(platforms, this.fan);
  this.physics.add.collider(player, this.fan, hittrampolino, null, this);
  // Saw

  this.Saw = this.physics.add.sprite(300, 560, "Saw");
  this.anims.create({
    key: "rotate",
    frames: this.anims.generateFrameNumbers("Saw", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  this.Saw.play("rotate", this);

  this.physics.add.collider(platforms, this.Saw);
  this.physics.add.collider(player, this.Saw, hitspike, null, this);
  // this.physics.add.collider(platforms, this.Saw, saww, null, this);
}

function update() {
  // Bg move
  this.bg.tilePositionX -= 0.2;
  this.bg.tilePositionY -= 0.1;
  this.Saw.y -= 2.2;

  // Player movement
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
}
function hitspike(player, spikes) {
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
