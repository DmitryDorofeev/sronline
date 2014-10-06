define([
  'backbone',
  'tmpl/game',
  'models/user'
], function (Backbone, tmpl, userModel) {
  var GameView = Backbone.View.extend({
    className: 'game',
    events: {
      'click': 'moveShip'
    },
    initialize: function() {
    },
    template: function() {
      return tmpl();
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    show: function () {
      this.trigger('show');
    },
    moveShip: function(e) {
      // TODO: Логика кораблика
    }
  });

  return new GameView();
});
