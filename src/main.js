import bg from "../assets/Free/Background/Blue.png";
import idle from "../assets/Free/personaggi/rosa/dude.png";
import dead from "../assets/Free/personaggi/dead.png";
import ground from "../assets/Free/Terrain/grass.png";
import block1 from "../assets/Free/Terrain/block-1.png";
import Saw from "../assets/Free/Traps/Saw/sawON.png";
import spike from "../assets/Free/Traps/Spikes/spike.png";
import Spikedball from "../assets/Free/Traps/SpikedBall/SpikedBall.png";
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
  this.load.spritesheet("idle", idle, {
    frameWidth: 32,
    frameHeight: 48,
  });

  this.load.spritesheet("dead", dead, {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("Saw", Saw, {
    frameWidth: 32,
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
  // Spikedball
  spikes.create(450, 500, "Spikedball");
  //blocchi
  platforms.create(200, 560, "block1");
  platforms.create(382, 560, "block1");
  platforms.create(520, 560, "block1");
  //player Creation - Animation
  player = this.physics.add.sprite(10, 550, "idle");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "idle", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("idle", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "dead",
    frames: this.anims.generateFrameNumbers("dead", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, spikes, hitspike, null, this);
  cursors = this.input.keyboard.createCursorKeys();

  // Saw (da fixare)

  //   this.Saw = this.physics.add.sprite(350, 560, "Saw");
  //   this.anims.create({
  //     key: "rotate",
  //     frames: this.anims.generateFrameNumbers("Saw", { start: 0, end: 7 }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.Saw.play("rotate", this);

  //   this.physics.add.collider(platforms, this.Saw);
  //   this.physics.add.collider(player, this.Saw);
}

function update() {
  // Bg move
  this.bg.tilePositionX -= 0.2;
  this.bg.tilePositionY -= 0.1;

  // Player movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-270);
  }
}
function hitspike(player, spikes) {
  this.scene.restart();
}
