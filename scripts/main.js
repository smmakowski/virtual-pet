// game state object
var GameState = {
  //
  isRotating: false,
  rotationDirection: 5,
  //methods
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignhorizontally = true;
  },
  preload: function() { // preload assets here
    this.load.image('backyard', 'assets/images/backyard.png');
    this.load.image('apple', 'assets/images/apple.png');
    this.load.image('arrow', 'assets/images/arrow.png');
    this.load.image('bar', 'assets/images/bar.png');
    this.load.image('candy', 'assets/images/candy.png');
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('rotate', 'assets/images/rotate.png');
    this.load.image('rubberDuck', 'assets/images/rubber_duck.png');
    this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
  },
  create: function() { // create scene here
    // add background
    this.background = this.game.add.sprite(0, 0,'backyard');

    // add pet
    this.pet = this.game.add.sprite(this.game.world.centerX, this.game.world.height * .6, 'pet');
    this.pet.anchor.setTo(.5);
    this.pet.customParams = {health: 100, fun: 100};
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag(this.pickItem, this);

    // create buttons
    this.apple = this.game.add.sprite(this.game.world.width * .125, 570, 'apple');
    this.apple.anchor.setTo(.5);
    this.apple.customParams = {health: 20};
    this.apple.inputEnabled = true;
    this.apple.events.onInputDown.add(this.pickItem, this);
    this.apple.events.onInputUp.add(this.revertSize, this);


    this.candy = this.game.add.sprite(this.game.world.width * .375, 570, 'candy');
    this.candy.anchor.setTo(.5);
    this.candy.customParams = {health: -10, fun: 10};
    this.candy.inputEnabled = true;
    this.candy.events.onInputDown.add(this.pickItem, this);
    this.candy.events.onInputUp.add(this.revertSize, this);

    this.rubberDuck = this.game.add.sprite(this.game.world.width * .625, 570, 'rubberDuck');
    this.rubberDuck.anchor.setTo(.5);
    this.rubberDuck.customParams = {fun: 20};
    this.rubberDuck.inputEnabled = true;
    this.rubberDuck.events.onInputDown.add(this.pickItem, this);
    this.rubberDuck.events.onInputUp.add(this.revertSize, this);

    this.rotate = this.game.add.sprite(this.game.world.width * .875, 570, 'rotate');
    this.rotate.anchor.setTo(.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotatePet, this);
    this.rotate.events.onInputUp.add(this.revertSize, this);

    // add text
  },
  update: function() { // update function
    if (this.isRotating) {
      this.pet.angle += this.rotationDirection;
    }
    if (this.pet.customParams.health <= 0) {
      console.log('FUCK YOU YOU KILLED ME YOU BASTARD');
    }
  },

  pickItem: function(sprite, event) {
    const self = this;
    sprite.scale.setTo(.8);
    if (sprite.customParams.health) {
      if (this.pet.customParams.health + sprite.customParams.health > 100) {
        this.pet.customParams.health = 100;
      } else {
        this.pet.customParams.health += sprite.customParams.health;
      }
    }
    if (sprite.customParams.fun) {
      if (this.pet.customParams.fun + sprite.customParams.fun > 100) {
        this.pet.customParams.fun = 100;
      } else {
        this.pet.customParams.fun += sprite.customParams.fun;
      }
    }
    console.log(self.pet.customParams.health);
  },
  rotatePet: function(sprite, event) {
    sprite.scale.setTo(.8);
    if (this.isRotating) {
      this.pet.angle = 0;
      this.isRotating = false;
    } else {
      const rand = Math.floor(Math.random() * 2);
      if (rand === 0) {
        this.rotationDirection = 5;
      } else {
        this.rotationDirection = -5;
      }
      this.isRotating = true;
    }
  },
  revertSize: function(sprite, event) {
    sprite.scale.setTo(1);
  }
};

let game = new Phaser.Game(360, 640, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state


// /****** EXPORTS FOR MOCHA TESTING ***********/
//
// module.exports = {
//   game: ,
// };
