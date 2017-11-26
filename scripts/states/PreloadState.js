let PreloadState = {
  preload: function() { // preload assets here
    // create images preloaded from bootState
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(.5);

    this.text = this.add.text(this.game.world.centerX, this.game.world.height * .7, 'Now Loading...', normalTextStyle);
    this.text.anchor.setTo(.5);

    this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.height * .6, 'loadingBar');
    this.loadingBar.anchor.setTo(.5);
    this.load.setPreloadSprite(this.loadingBar); // automatically loads loading sprite that crops depning how much has been loaded

    this.load.image('backyard', '../../assets/images/backyard.png');
    this.load.image('apple', '../../assets/images/apple.png');
    this.load.image('arrow', '../../assets/images/arrow.png');
    this.load.image('candy', '../../assets/images/candy.png');
    this.load.image('rotate', '../../assets/images/rotate.png');
    this.load.image('rubberDuck', '../../assets/images/rubber_duck.png');
    this.load.spritesheet('pet', '../../assets/images/pet.png', 97, 83, 5, 1, 1);
  },
  create: function() {
    this.state.start('HomeState');
  }
};
