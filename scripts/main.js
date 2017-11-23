let game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game
//create game state object
let GameState = {
  preload: preload,
  create: create,
  update: update,
};

//game state methods
function preload() {

}

function create() {

}

function update() {

}

game.state.add('GameState', Gamestate); // add GameState
game.state.start('GameState');
