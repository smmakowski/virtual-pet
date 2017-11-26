let BootState = {
  // moved from Gamestate, put in bootState to set scale early on
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignhorizontally = true;
  },
  preload: function() {
    // load imges
    this.load.image('logo', '../../assets/images/logo.png');
    this.load.image('loadingBar', '../../assets/images/bar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#fff'; // set background for bagroundless stage;
    this.state.start('PreloadState');
  },
};
