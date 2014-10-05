define([
  'jquery',
  'backbone',
  'tmpl/app',
  'views/header'
], function ($, Backbone, tmpl, headerView) {

  var AppView = Backbone.View.extend({
      tagName: 'div',
      className: 'app',
      initialize: function() {
        this.$container = $('body');
        this.render();
      },
      template: tmpl,
      render: function () {
        this.$el.html(this.template());
        this.$container.html(this.$el);
        this.$el.find('#header').html(headerView.render().$el);
      },
      subscribe: function (view) {
        this.listenTo(view, 'show', this.add);
        this.currentView = view;
      },
      unsubscribe: function (view) {
        this.stopListening(view);
      },
      add: function () {
        this.$el.find('#page').html(this.currentView.render().$el);
      }
  });

  return new AppView();

});
