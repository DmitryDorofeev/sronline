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
      this.collection.fetch({
        success: function() {
          var scores = this.collection.toJSON();
          this.$el.html(this.template(scores));
          this.$page.html(this.$el);
        }
      });
    }
  });

  return new ScoreboardView({collection: scoreCollection});
});
