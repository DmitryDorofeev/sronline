define([
  'jquery',
  'backbone',
  'collections/score',
  'tmpl/scoreboard'
], function($, Backbone, scoreCollection, tmpl) {

  var ScoreboardView = Backbone.View.extend({
    initialize: function() {
      this.$page = $('#page');
    },
    template: tmpl,
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function() {
          var scores = that.collection.toJSON();
          that.$el.html(that.template(scores));
          that.$page.html(that.$el);
        }
      });
    }
  });

  return new ScoreboardView({collection: scoreCollection});
});
