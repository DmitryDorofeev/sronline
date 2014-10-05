define([
  'jquery',
  'backbone',
  'tmpl/app',
  'views/home'
], function ($, Backbone, tmpl, homeView) {

  var AppView = Backbone.View.extend({
      tagName: 'div',
      className: 'app',
      initialize: function() {
        this.listenTo(homeView, 'show', this.renderPage);
        this.render();
      },
      template: tmpl,
      render: function () {
        
        this.$el.prependTo('body');
      },
      renderPage: function () {
        alert('lal');
      }
  });

  return new AppView();

});
