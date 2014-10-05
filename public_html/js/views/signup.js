define([
  'jquery',
  'backbone',
  'tmpl/signup',
  'models/user'
], function ($, Backbone, tmpl, userModel) {
  var SignupView = Backbone.View.extend({
    model: userModel,
    initialize: function() {
    },
    events: {
      'submit .signup-form': 'signup'
    },
    template: tmpl,
    render: function() {
      this.$el.html(this.template());
      this.$error = this.$el.find('#error');
      return this;
    },
    signup: function (e) {
      e.preventDefault();
      var form = $('.signup-form');
      this.model.set({
        login: form.find('input[name=login]').val(),
        email: form.find('input[name=email]').val(),
        password: form.find('input[name=password]').val(),
      });
    },
    renderError: function(msg) {
      this.$error.text(msg);
    },
    show: function () {
      this.trigger('show');
    }
  });

  return new SignupView();
});
