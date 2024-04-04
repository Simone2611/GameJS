global.Phaser = require("phaser");
import bg from "../assets/Free/Background/Blue.png";
import idle from "../assets/Free/personaggi/rosa/idle.png";
import run from "../assets/Free/personaggi/rosa/run.png";
import runl from "../assets/Free/personaggi/rosa/runleft.png";
import fall from "../assets/Free/personaggi/rosa/fall.png";
import dead from "../assets/Free/personaggi/dead.png";
import ground from "../assets/Free/Terrain/grass.png";
import block2 from "../assets/Free/Terrain/block-1.png";
import slab from "../assets/Free/Terrain/slab.png";
import Saw from "../assets/Free/Traps/Saw/chainON.png";
import spike from "../assets/Free/Traps/Spikes/spike.png";
import Spikedball from "../assets/Free/Traps/SpikedBall/SpikedBall.png";
import trampolino from "../assets/Free/Traps/Trampoline/trampolino.png";
import trampolinoIdle from "../assets/Free/Traps/Trampoline/trampidle.png";
import apple from "../assets/Free/Items/Fruits/Apple.png";
import end from "../assets/Free/Items/Checkpoints/End/End.png";
import checkpoint from "../assets/Free/Items/Checkpoints/Checkpoint/checkpoint.png";
import hitbox from "../assets/hitbox.png";
import hitboxR from "../assets/hitbox-r.png";
import key from "../assets/Free/key/02.png";
import lock from "../assets/Free/key/05.png";
import dashrefill from "../assets/Free/key/18.png";
import blockEnemy from "../assets/Free/Traps/rockhead/Idle.png";
var dash;
var tuto;
var checkpointOn = false;
if (localStorage.getItem("x-4") == 790 && localStorage.getItem("y-4") == 480) {
  checkpointOn = true;
  count = 0;
}
var tuto2;
var spikelockY = 20;
var player;
var speed2 = 0;
var speed3 = 50;
var cheat = "";
var count = 0;
var platforms;
var Deaths;
if (localStorage.getItem("morti") == null) {
  localStorage.setItem("morti", 0);
}
if (localStorage.getItem("y-4") == null) {
  localStorage.setItem("y-4", 550);
}
if (localStorage.getItem("x-4") == null) {
  localStorage.setItem("x-4", 20);
}

var morti = localStorage.getItem("morti");
var spikes;
var fps;
var cursors;
var speed = -60;
var score = 0;
var scoreText;
var keyA;
var hitboxX = 550;
var keyD;
var keyW;
var keyZ;
var keyR;
var keySpace;
var keyEsc;
var i = 0;
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
  this.load.image("key", key);
  this.load.image("blockEnemy", blockEnemy);
  this.load.image("refill", dashrefill);
  this.load.image("lock", lock);
  this.load.image("hitbox", hitbox);
  this.load.image("hitbox2", hitboxR);
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
  for (let i = 0; i < 650; i += 40) {
    platforms.create(i, 500, "ground");
  }

  // spike
  spikes = this.physics.add.staticGroup();

  for (let i = 100; i < 750; i += 55) {
    spikes.create(i, 577, "spike");
  }
  spikes.create(349, 577, "spike");
  spikes.create(470, 476, "spike");
  spikes.create(375, 476, "spike");
  spikes.create(390, 340, "spike");
  spikes.create(410, 340, "spike");
  spikes.create(353, 476, "spike");
  spikes.create(330, 476, "spike");

  spikes.create(205, 476, "spike");
  spikes.create(253, 476, "spike");
  spikes.create(230, 476, "spike");
  // spikeball

  spikes.create(405, 420, "Spikedball").setCircle(15).refreshBody();
  spikes.create(450, 420, "Spikedball").setCircle(15).refreshBody();
  spikes
    .create(405, 380, "Spikedball")
    .setCircle(15)
    .setScale(0.8)
    .refreshBody();
  spikes.create(300, 420, "Spikedball").setCircle(15).refreshBody();
  spikes.create(180, 420, "Spikedball").setCircle(15).refreshBody();
  //slab
  platforms.create(800, 510, "slab");

  platforms.create(400, 350, "slab");
  //blocchi
  platforms.create(500, 460, "block2");
  platforms.create(500, 420, "block2");

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
    frames: this.anims.generateFrameNumbers("fall", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, spikes, hitspike, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  // apple
  this.apple = this.physics.add.staticGroup();

  this.apple.create(360, 550, "apple");
  this.apple.create(750, 550, "apple");

  this.time.addEvent({
    delay: 3000,
    callback: () => {
      this.apple.create(360, 550, "apple");
      this.apple.create(550, 440, "apple");
    },
    loop: true,
  });

  this.physics.add.collider(platforms, this.apple);
  this.physics.add.overlap(player, this.apple, collect, null, this);
  //refill
  //   this.refill = this.physics.add.staticGroup();
  //   this.refill.create(20, 360, "refill");
  //   this.time.addEvent({
  //     delay: 5000,
  //     callback: () => {
  //       this.refill.create(20, 360, "refill");
  //     },
  //     loop: true,
  //   });
  //   this.physics.add.overlap(player, this.refill, dashadd, null, this);
  // END
  this.end = this.physics.add.staticGroup();
  this.end.create(20, 463, "end").setScale(0.5).refreshBody().setSize(20, 30);
  this.physics.add.overlap(player, this.end, nextlvl, null, this);
  // Checkpoint
  this.checkpoint = this.physics.add
    .staticSprite(800, 485, "checkpoint")
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

  // this.trampolino = this.physics.add.staticSprite(750, 567, "tramp");
  // // this.trampolino = this.physics.add.staticSprite(220, 300, "fan2");
  // this.physics.add.collider(platforms, this.trampolino);
  // this.physics.add.collider(player, this.trampolino, hittrampolino, null, this);
  // Saw

  this.Saw = this.physics.add.sprite(-100, 580, "Saw").setSize(20, 22);
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
  // blockenemy

  this.blockEnemy = this.physics.add
    .sprite(300, 200, "blockEnemy")
    .setSize(20, 22);
  this.physics.add.collider(platforms, this.blockEnemy);

  this.hitbox2 = this.physics.add.staticGroup();
  this.hitbox = this.physics.add.sprite(550, 220, "hitbox2").setVisible(false);

  this.hitbox2.create(550, 430, "hitbox").setSize(20, 60).setVisible(false);
  // this.hitbox2.create(550, 400, "hitbox2").setVisible(false);
  this.physics.add.collider(player, this.blockEnemy, hitspike, null, this);
  this.physics.add.overlap(player, this.hitbox2, godown, null, this);
  this.physics.add.collider(platforms, this.blockEnemy, goup, null, this);
  this.physics.add.collider(this.blockEnemy, this.hitbox, () => {
    speed2 = -10;
  });
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
  dash = this.add.text(570, 16, count + "% Dash", {
    fontSize: "1.2rem",
    fill: "#000",
    fontFamily: "Arial",
  });

  // WASD
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  if (
    localStorage.getItem("x-4") == null ||
    localStorage.getItem("x-4") == undefined ||
    localStorage.getItem("x-4") == ""
  ) {
  } else {
    const positionX = JSON.parse(localStorage.getItem("x-4"));
    const positionY = JSON.parse(localStorage.getItem("y-4"));
    player.setX(positionX);
    player.setY(positionY);
  }
}

function update() {
  // Bg move
  this.bg.tilePositionX += 0.6;
  this.bg.tilePositionY -= 0.6;
  //saw

  this.Saw.setVelocityX(-speed);
  this.Saw.setY(550);
  this.Saw.setVelocityY(0.00001);
  // blockenemy
  this.hitbox.setX(hitboxX);

  this.hitbox.setY(220);
  this.hitbox.setVelocityY(0.0000001);

  this.blockEnemy.setX(550);
  this.blockEnemy.setVelocityY(speed2);
  let controls = localStorage.getItem("gamekey");
  let space = localStorage.getItem("spacebar");
  this.checkpoint.anims.play("flag", true);
  // Player movement
  player.setSize(15, 27);
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
    // dash
    if (player.body.touching.down) {
    } else {
      if (count != 0 || count == null || count < 0) {
        if (keyZ.isDown && cursors.left.isDown) {
          player.setVelocityX(-1000);
          player.setSize(24, 10);
          player.anims.play("left", true);
          count -= 1;
        } else if (keyZ.isDown) {
          player.setVelocityX(1000);
          player.setSize(24, 10);
          player.anims.play("right", true);
          count -= 1;
        }
      }
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
    // dash
    if (player.body.touching.down) {
    } else {
      if (count != 0 || count == null || count < 0) {
        if (keyZ.isDown && keyA.isDown) {
          player.setVelocityX(-500);
          player.setSize(24, 10);
          player.anims.play("left", true);
          count -= 1;
        } else if (keyZ.isDown) {
          player.setVelocityX(500);
          player.setSize(24, 10);
          player.anims.play("right", true);
          count -= 1;
        }
      }
    }
  }
  if (space == "on") {
    if (keySpace.isDown && player.body.touching.down) {
      player.setVelocityY(-270);
    }
  }

  if (keyR.isDown) {
    speed2 = 0;
    if (checkpointOn == true) {
      count = 0;
    } else {
      count = 0;
    }
    this.Saw.setX(-30);

    if (
      localStorage.getItem("x-4") != null &&
      localStorage.getItem("x-4") != 790
    ) {
      localStorage.setItem("x-4", 20);
    }
    if (
      localStorage.getItem("y-4") != null &&
      localStorage.getItem("y-4") != 480
    ) {
      localStorage.setItem("y-4", 550);
    }
    if (
      localStorage.getItem("x-4") == 790 &&
      localStorage.getItem("y-4") == 480
    ) {
      player.setX(790);
      player.setY(480);
    } else {
      player.setX(20);
      player.setY(550);
    }
    this.Saw.setX(-30);
    hitboxX = 550;
    this.blockEnemy.setY(200);
  }

  if (i == 1) {
    hitboxX = 550;
    i = 0;
  }

  fps.setText(Math.round(game.loop.actualFps) + " FPS");
  Deaths.setText(morti + " Deaths");
  dash.setText(count + "% Dash");
}

function hitspike(player, spikes) {
  if (checkpointOn == true) {
    count = 0;
  } else {
    count = 0;
  }

  speed2 = 0;
  morti++;
  localStorage.setItem("morti", morti);
  if (
    localStorage.getItem("x-4") == 790 &&
    localStorage.getItem("y-4") == 480
  ) {
    player.setX(790);
    player.setY(480);
  } else {
    player.setX(20);
    player.setY(550);
  }
  this.Saw.setX(-30);

  this.blockEnemy.setY(180);
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
  // score += 10;
  // scoreText.setText("Score: " + score);
}
function removecollect(spike, apple) {
  apple.disableBody(true, true);
}
function nextlvl() {
  if (cheat == "on") {
  } else {
    window.location.href = window.location.origin + "/level5.html";
  }
}
function checkpointsave() {
  if (cheat == "on") {
  } else {
    localStorage.setItem("x-4", 790);
    localStorage.setItem("y-4", 480);
    checkpointOn == true;
    count = 0;
  }
}

function dashadd(player, refill) {
  count = 30;
  refill.disableBody(true, true);
}

function godown(player, hitbox) {
  speed2 = 1000;
  hitboxX = 20;
  i = 1;
}
function goup() {
  speed2 = -200;

  i = 0;
}
