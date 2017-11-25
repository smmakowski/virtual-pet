// game state object
var GameState = {
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

    // create buttons
    this.apple = this.game.add.sprite(this.game.world.width * .125, 570, 'apple');
    this.apple.anchor.setTo(.5);
    this.candy = this.game.add.sprite(this.game.world.width * .375, 570, 'candy');
    this.candy.anchor.setTo(.5);
    this.rubberDuck = this.game.add.sprite(this.game.world.width * .625, 570, 'rubberDuck');
    this.rubberDuck.anchor.setTo(.5);
    this.rotate = this.game.add.sprite(this.game.world.width * .875, 570, 'rotate');
    this.rotate.anchor.setTo(.5);

    // add text


  },
  update: function() { // update function

  },
};

var game = new Phaser.Game(360, 640, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
