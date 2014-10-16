define([
  'backbone',
  'tmpl/game',
  'models/user',
  'views/stage',
  'motion'
], function (Backbone, tmpl, userModel, stageView) {
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
