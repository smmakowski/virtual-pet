let game = new Phaser.Game(360, 640, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
