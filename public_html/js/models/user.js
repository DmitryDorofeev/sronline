define([
  'jquery',
  'backbone'
], function($, Backbone) {
  var UserModel = Backbone.Model.extend({
    url: '/api/v1/auth/signin',
    initialize: function() {
      this.fetch();
    },
    isLogined: function() {
      return (this.login !== undefined);
    },
    logout: function() {
      $.ajax({
        type: 'POST',
        url: '/api/v1/auth/logout'
      }).done(function() {
        this.clear();
        this.trigger('logout');
      });
    },
    login: function () { // TODO доделать
      var that = this;
      $.ajax({
        url: url,
        type: 'POST',
        data: this.toJSON(),
        dataType: 'json',
        success: function(data) {
          if (data.status === 200) {
            this.set({
              'login': data.login,
              'email': data.email,
              'avatar': data.avatar
            });
            that.trigger('logined');
          }
          else if (data.status === 403) {
            that.trigger('notlogined')
          }
        },
        error: function() {
          that.trigger('error');
        }
      });
    },
    signup: function() { // TODO допилить
      var that = this;
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function(data) {
          if (data.status == 200) {
            that.trigger('registred');
          }
          else if (data.status == 404) {
            that.trigger('notregistred');
          }
        },
        error: function() {
          that.trigger('error');
        }
      });
    }
  });

  return new UserModel();

});
