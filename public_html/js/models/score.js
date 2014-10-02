define([
  'jquery',
  'backbone'
], function($, Backbone) {

  var ScoreModel = Backbone.Model.extend({
    defaults: {
      userName: 'Sample User',
      score: '100500'
    }
  });

  return ScoreModel;

});
