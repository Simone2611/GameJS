import bg from "../assets/Free/Background/Blue.png";
import idle from "../assets/Free/personaggi/rosa/dude.png";
import ground from "../assets/Free/Terrain/grass.png";

var player;
var cursors;
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
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
  this.load.spritesheet("idle", idle, {
    frameWidth: 32,
    frameHeight: 48,
  });
}
import { personaggio } from "./personaggio.js";
function create() {
  this.bg = this.add.tileSprite(400, 300, 800, 600, "bg");

  platforms = this.physics.add.staticGroup();

  platforms.create(20, 600, "ground");

  for (let i = 50; i < 850; i += 30) {
    console.log(i);
    platforms.create(i, 600, "ground");
  }

  player = this.physics.add.sprite(100, 450, "idle");

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

  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player, platforms);
}

function update() {
  this.bg.tilePositionX -= 0.2;
  this.bg.tilePositionY -= 0.1;

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
    player.setVelocityY(-330);
  }
}
