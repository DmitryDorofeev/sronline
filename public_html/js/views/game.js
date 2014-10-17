define([
  'backbone',
  'tmpl/game',
  'models/user',
  'views/stage',
  'views/ship',
  'motion'
], function (Backbone, tmpl, userModel, stageView, shipView) {
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
      this.$el.append(stageView.render().$el);
      this.$el.append(shipView.render().$el);
      return this;
    },
    show: function () {
      if (userModel.isLogined()) {
        this.trigger('show', this);
      }
      else {
        userModel.trigger('login:bad');
      }
    }
  });

  return new GameView();
});
