// game state object
var GameState = {
  preload: function() { // preload assets here
    this.load.image('background', 'assets/images/sample-background.png');
  },
  create: function() { // create scene here
    this.background = this.game.add.sprite(0, 0,'background');
  },
  update: function() { // update function

  },
};

var game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
