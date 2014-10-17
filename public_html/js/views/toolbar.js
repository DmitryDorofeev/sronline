define([
  'jquery',
  'backbone',
  'tmpl/header',
  'models/user'
], function ($, Backbone, tmpl, userModel) {

  var HeaderView = Backbone.View.extend({
    model: userModel,
    className: 'toolbar',
    template: function () {
      return tmpl(this.model.toJSON());
    },
    initialize: function () {
      this.$container = $('#toolbar');
      this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return new HeaderView();

});
