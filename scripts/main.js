let game = new Phaser.Game(360, 640, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.add('HomeState', HomeState);
game.state.add('GameState', GameState); // add GameState
game.state.start('BootState'); // start game state
