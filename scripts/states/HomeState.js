let HomeState = {
  init: function(message) {
    if (message) {
      this.message = message;
    } else {
      this.message = '';
    }
  },
  create: function() {
    // load background
    this.background = this.game.add.sprite(0, 0,'backyard');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.startGame,this);

    this.gameOver = this.add.text(this.game.world.centerX, this.game.world.height * .15, this.message, gameOverTextStyle);
    this.gameOver.anchor.setTo(.5);

    this.text = this.add.text(this.game.world.centerX, this.game.world.height * .85, 'Touch or click\nanywhere to start', homeTextStyle);
    this.text.anchor.setTo(.5);
    this.game.time.events.add(5, this.toggleText, this);
    this.toggleLoop = this.game.time.events.loop(Phaser.Timer.SECOND * .5, this.toggleText, this);
  },

  startGame: function() {
    const self = this;
    this.time.events.remove(self.toggleLoop);
    this.state.start('GameState');
  },

  toggleText: function() {
    if (this.text.visible) {
      this.text.visible = false;
    } else {
      this.text.visible = true;
    }
  },
};
