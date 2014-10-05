define([
  'backbone',
  'tmpl/game',
  'models/user'
], function (Backbone, tmpl, userModel) {
  var GameView = Backbone.View.extend({
    className: 'game-page',
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
    },
    show: function () {
      this.$el.appendTo('.app');
    },
    moveShip: function(e) {
      // TODO: Логика кораблика
    }
  });

  return new GameView();
});
