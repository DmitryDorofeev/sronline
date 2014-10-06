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
      if (userModel.isLogined()) {
        this.trigger('show', this);
      }
      else {
        userModel.trigger('notlogined');
      }
    },
    moveShip: function(e) {
      // TODO: Логика кораблика
    }
  });

  return new GameView();
});
