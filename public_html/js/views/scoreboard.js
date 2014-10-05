define([
  'jquery',
  'backbone',
  'collections/score',
  'tmpl/scoreboard'
], function($, Backbone, scoreCollection, tmpl) {

  var ScoreboardView = Backbone.View.extend({
    tagName: 'div',
    collection: scoreCollection,
    initialize: function() {
      this.render();
    },
    template: tmpl,
    render: function() {
      var that = this;
      this.collection.fetch({
        success: function() {
          var scores = that.collection.toJSON();
          that.$el.html(that.template(scores));
        }
      });
    }
  });

  return new ScoreboardView();
});
