define([
  'jquery',
  'backbone',
  'tmpl/login',
  'models/user'
], function ($, Backbone, tmpl, userModel) {
  var LoginView = Backbone.View.extend({
    initialize: function() {
      this.$page = $('#page');
    },
    events: {
      'submit form': 'login'
    },
    template: tmpl,
    render: function() {
      this.$el.html(this.template());
      this.$page.html(this.$el);
      this.$error = $('#error');
    },
    login: function(e) {
      e.preventDefault();
      var form = this.$el.find('form');
      this.model.login({
        login: form.find('input[name=login]'),
        password: form.find('input[name=password]')
      });
    },
    renderError: function(msg) {
      this.$error.text(msg);
    }
  });

  return new LoginView();
});
