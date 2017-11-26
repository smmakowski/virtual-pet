//game state object
let GameState = {
  //
  isRotating: false,
  rotationDirection: -5,
  uiBlocked: false,
  selectedItem: null,
  //methods
  create: function() { // create scene here
    const self = this;
    // add background
    this.background = this.game.add.sprite(0, 0,'backyard');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.dropItem,this);

    // add pet
    this.pet = this.game.add.sprite(this.game.world.centerX, this.game.world.height * .6, 'pet');
    this.pet.anchor.setTo(.5);
    this.pet.customParams = {health: 100, fun: 100};
    this.pet.inputEnabled = true;
    this.pet.input.pixelPerfectClick = true;
    this.pet.input.enableDrag();
    this.pet.events.onInputDown.add(this.stopRotation,this);

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
    // add handler using anon function
    this.rotate.events.onInputUp.add(function() {
      if (self.rotationDirection === 5) {
        self.rotate.scale.setTo(-1, 1);
      } else {
        self.rotate.scale.setTo(1);
      }

    }, this);

    this.items = [this.apple, this.candy, this.rubberDuck];
    // styles for

    // add header text
    this.game.add.text(this.game.width * .1, this.game.height * .1, 'Health:', headerStyle);
    this.game.add.text(this.game.width * .6, this.game.height * .1, 'Fun:', headerStyle);

    this.healthText = this.game.add.text(this.game.width * .4, this.game.height * .1, '', normalTextStyle);
    this.funText = this.game.add.text(this.game.width * .8, this.game.height * .1, '', normalTextStyle);

    this.updateStats();

    this.agePet = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.decreaseStats, this);

  },
  update: function() { // update function
    const self = this;
    if (this.isRotating) {
      this.pet.angle += this.rotationDirection;
    }
    if (this.pet.customParams.health <= 0  || this.pet.customParams.fun <= 0) {
      this.pet.input.disableDrag();
      this.uiBlocked = true;
      this.time.events.remove(self.agePet);
      this.stopRotation();
      this.healthText.text = 'DEAD';
      this.funText.text = 'DEAD';
      this.healthText.style.fill = 'Red';
      this.funText.style.fill = 'Red';
      this.pet.frame = 4;

      // let deathAnimation = this.pet.animations.add('die', [1, 2, 3, 2, 1], 7, false);
      //
      // deathAnimation.onComplete.add(function() {
      //   console.log('dead');
      // }, this);
      // deathAnimation.play('die');

      this.game.time.events.add(2000, this.gameOver, this);
    }
  },

  pickItem: function(sprite, event) {
    if (!this.uiBlocked) {
      const self = this;
      sprite.scale.setTo(.8);
      this.clearSelection();
      sprite.alpha = .4;
      this.selectedItem = sprite;
    }
  },
  rotatePet: function(sprite, event) {
    if (!this.uiBlocked) {
      // this.clearSelection();
      sprite.scale.setTo(.8);
      sprite.alpha = .4;

      this.rotationDirection *= -1;
      this.isRotating = true;
    }
  },

  stopRotation: function() {
    const self = this;
    self.rotate.alpha = 1;
    self.isRotating = false;
    self.pet.angle = 0;
  },

  dropItem: function(sprite, event) {
    const self = this;
    if (this.selectedItem && !this.uiBlocked) {
      this.uiBlocked = true;
      this.stopRotation();
      const x = event.x;
      const y = event.y;
      let newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      newItem.customParams = this.selectedItem.customParams;
      newItem.anchor.setTo(.5);

      let eatingAnimation = this.pet.animations.add('eat', [1, 2, 3, 2, 1], 7, false);
      eatingAnimation.onComplete.add(function() {
        self.updateStats();
        newItem.destroy();
        self.uiBlocked = false;
      }, this);

      let petMovement = this.add.tween(self.pet);
      petMovement.to({x: x, y, y}, 700);

      petMovement.onComplete.add(function() {
        // calculate new stats for pet;
        for (let key in newItem.customParams) {
          let result = self.pet.customParams[key] + newItem.customParams[key];

          if (result >= 100) {
            self.pet.customParams[key] = 100;
          } else if (result <= 0) {
            self.pet.customParams[key] = 0;
          } else {
            self.pet.customParams[key] = result;
          }

        }
        eatingAnimation.play('eat');
      });

      petMovement.start();
    }
  },
  clearSelection: function() {
    this.items.forEach(function(button) {
      button.alpha = 1;
    });
    this.selectedItem = null;
  },

  revertSize: function(sprite, event) {
    sprite.scale.setTo(1);
  },

  updateStats: function() {
    const self = this;
    for (let key in this.pet.customParams) {
      // console.log(self[key + 'Text'].style);
      // if (this.pet.customParams[key] < 20) {
      //   self[key + 'Text'].stylelowTextStyle.font;
      // } else {
      //   self[key = 'Text'].style.cssFont = normalTextStyle.font;
      // }

      this[key + 'Text'].text = this.pet.customParams[key];
    }
  },
  decreaseStats() {
    this.pet.customParams.health -= 10;
    this.pet.customParams.fun -= 15;
    for (let key in this.pet.customParams) {
      if (this.pet.customParams[key] <= 0) {
        this.pet.customParams[key] = 0;
      }
    }
    this.updateStats();
  },
  gameOver: function() {
    this.uiBlocked = false;
    this.game.state.start('HomeState', true, false, 'GAME OVER!');
  },
};
