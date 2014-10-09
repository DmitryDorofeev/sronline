define([
  'backbone',
  'tmpl/game',
  'models/user',
  'phaser'
], function (Backbone, tmpl, userModel, Phaser) {
  var GameView = Backbone.View.extend({
    className: 'game',
    id: 'game',
    events: {
      'click': 'moveShip'
    },
    initialize: function() {
      this.render();
    },
    template: function() {
      return tmpl();
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    show: function () {
      if (userModel.isLogined()) {
        this.trigger('show', this);
        this.startGame();
      }
      else {
        userModel.trigger('login:bad');
      }
    },
    startGame: function () {
        this.game = new Phaser.Game(1450, 800, Phaser.CANVAS, this.el, {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.renderShip
      });
    },
    preload: function () {
      this.game.load.image('ship', '/images/ship2.png');
      this.game.load.image('backdrop', '/images/space1.jpg');
    },
    create: function () {
      this.game.world.setBounds(0, 0, 3000, 3000);
      this.game.add.sprite(0, 0, 'backdrop');
      this.shipSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
      this.game.camera.follow(this.shipSprite);
      this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function () {
      if (this.cursors.left.isDown) {
          this.shipSprite.x -= 4;
          this.shipSprite.angle -= 4;
      }
      else if (this.cursors.right.isDown) {
          this.shipSprite.x += 4;
          this.shipSprite.angle += 4;
      }
      if (this.cursors.up.isDown) {
          this.shipSprite.y -= 4;
          this.shipSprite.angle -= 4;
      }
      else if (this.cursors.down.isDown) {
          this.shipSprite.y += 4;
          this.shipSprite.angle += 4;
      }

      this.game.world.wrap(this.shipSprite, 0, true);
    },
    renderShip: function () {
      this.game.debug.cameraInfo(this.game.camera, 500, 32);
      this.game.debug.spriteCoords(this.shipSprite, 32, 32);
    }
    
  });

  return new GameView();
});
