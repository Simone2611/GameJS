import bg from "../assets/Free/Background/Yellow.png";
import idle from "../assets/Free/personaggi/mask/idle.png";
import run from "../assets/Free/personaggi/mask/run.png";
import runl from "../assets/Free/personaggi/mask/runleft.png";
import fall from "../assets/Free/personaggi/mask/fall.png";
import dead from "../assets/Free/personaggi/dead.png";
import ground from "../assets/Free/Terrain/ground2.png";
import block2 from "../assets/Free/Terrain/block-2.png";
import slab from "../assets/Free/Terrain/slab2.png";
import Saw from "../assets/Free/Traps/Saw/chainON.png";
import spike from "../assets/Free/Traps/Spikes/spike.png";
import Spikedball from "../assets/Free/Traps/SpikedBall/SpikedBall.png";
import trampolino from "../assets/Free/Traps/Trampoline/trampolino.png";
import hitbox from "../assets/hitbox.png";
import trampolinoIdle from "../assets/Free/Traps/Trampoline/trampidle.png";
import strawberry from "../assets/Free/Items/Fruits/Strawberry.png";
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
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  plugins: {
    scene: [
      {
        key: "DebugBodyColorsPlugin",
        plugin: Phaser.Plugins.DebugBodyColorsPlugin,
        mapping: "debugBodyColors",
      },
    ],
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
  this.load.spritesheet("strawberry", strawberry, {
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
    this.physics.world.createDebugGraphic(true);
    cheat = "on";
  } else {
    cheat = "off";
  }
  if (
    localStorage.getItem("x-2") != null &&
    localStorage.getItem("x-2") != 20
  ) {
    localStorage.setItem("x-2", 20);
  }
  if (
    localStorage.getItem("y-2") != null &&
    localStorage.getItem("y-2") != 380
  ) {
    localStorage.setItem("y-2", 550);
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

  for (let i = 100; i < 280; i += 15) {
    spikes.create(i, 577, "spike");
  }

  for (let i = 320; i < 480; i += 15) {
    spikes.create(i, 577, "spike");
  }

  spikes.create(400, 470, "spike");
  // Spikedball
  spikes.create(55, 520, "Spikedball").setCircle(15).refreshBody();
  spikes.create(600, 500, "Spikedball").setCircle(12);
  spikes.create(500, 480, "Spikedball").setCircle(12);
  spikes.create(215, 520, "Spikedball").setCircle(10).refreshBody();
  spikes.create(160, 480, "Spikedball").setCircle(10).refreshBody();
  spikes.create(180, 390, "Spikedball").setCircle(10).refreshBody();
  spikes.create(210, 330, "Spikedball").setCircle(10).refreshBody();
  spikes.create(30, 330, "Spikedball").setCircle(10).refreshBody();

  //slab
  platforms.create(600, 500, "slab");
  platforms.create(700, 500, "slab");
  platforms.create(500, 480, "slab");
  platforms.create(400, 480, "slab");

  //blocchi
  platforms.create(300, 450, "block2");
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
  //move
  this.hitbox = this.physics.add.staticGroup();

  this.hitbox.create(70, 300, "hitbox").setVisible(false);
  this.hitbox.create(510, 300, "hitbox").setVisible(false);

  this.spike = this.physics.add.image(300, 300, "Spikedball").setCircle(13, 1);
  this.spike2 = this.physics.add.image(420, 300, "Spikedball").setCircle(13, 1);
  this.physics.add.collider(this.hitbox, this.spike, () => {
    speed2 = speed2 * -1;
  });
  this.physics.add.collider(this.hitbox, this.spike2, () => {
    speed3 = speed3 * -1;
  });
  this.physics.add.collider(player, this.spike, hitspike, null, this);
  // strawberry
  this.strawberry = this.physics.add.staticGroup();
  this.strawberry.create(200, 550, "strawberry");
  this.strawberry.create(400, 550, "strawberry");
  this.strawberry.create(750, 500, "strawberry");
  this.strawberry.create(200, 400, "strawberry");
  this.strawberry.create(60, 330, "strawberry");
  this.time.addEvent({
    delay: 3000,
    callback: () => {
      this.strawberry.create(200, 550, "strawberry");
      this.strawberry.create(400, 550, "strawberry");
      this.strawberry.create(750, 500, "strawberry");
      this.strawberry.create(200, 400, "strawberry");
      this.strawberry.create(60, 330, "strawberry");
    },
    loop: true,
  });

  this.physics.add.collider(platforms, this.strawberry);
  this.physics.add.overlap(player, this.strawberry, collect, null, this);
  // END
  this.end = this.physics.add.staticGroup();
  this.end.create(9, 78, "end").setScale(0.5).refreshBody().setSize(20, 30);
  this.physics.add.overlap(player, this.end, nextlvl, null, this);
  // Checkpoint
  this.checkpoint = this.physics.add
    .staticSprite(20, 391, "checkpoint")
    .setScale(0.6)
    .refreshBody()
    .setSize(30, 20);
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

  this.Saw = this.physics.add.sprite(700, 550, "Saw").setSize(20, 22);
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

  Deaths = this.add.text(630, 16, morti + " Deaths", {
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
    localStorage.getItem("x-2") == null ||
    localStorage.getItem("x-2") == undefined ||
    localStorage.getItem("x-2") == ""
  ) {
  } else {
    const positionX = JSON.parse(localStorage.getItem("x-2"));
    const positionY = JSON.parse(localStorage.getItem("y-2"));
    player.setX(positionX);
    player.setY(positionY);
  }
}

function update() {
  // Bg move
  this.bg.tilePositionX -= 0.6;
  //saw
  this.spike.setVelocityX(speed2);
  this.spike.setVelocityY(-10);
  this.spike2.setVelocityX(speed3);
  this.spike2.setVelocityY(-10);
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
    score = 0;
    if (
      localStorage.getItem("x-2") != null &&
      localStorage.getItem("x-2") != 20
    ) {
      localStorage.setItem("x-2", 20);
    }
    if (
      localStorage.getItem("y-2") != null &&
      localStorage.getItem("y-2") != 380
    ) {
      localStorage.setItem("y-2", 550);
    }
    this.scene.restart();
  }

  fps.setText(Math.round(game.loop.actualFps) + " FPS");
}

function hitspike(player, spikes) {
  score = 0;
  morti++;
  localStorage.setItem("morti", morti);
  this.scene.restart();
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
function collect(player, strawberry) {
  strawberry.disableBody(true, true);

  //  Add and update the score
  // score += 10;
  // scoreText.setText("Score: " + score);
}
function removecollect(spike, strawberry) {
  strawberry.disableBody(true, true);
}
function nextlvl() {
  if (cheat == "on") {
  } else {
    window.location.href = window.location.origin + "/level1.html";
  }
}

function checkpointsave() {
  localStorage.setItem("x-2", 20);
  localStorage.setItem("y-2", 380);
}
