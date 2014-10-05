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
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function(data) {
          if (data.status === 200) {
            userModel.set({
              'login': data.login,
              'email': data.email,
              'avatar': data.avatar
            });
            console.log(userModel.toJSON());
            window.location.href = '#game';
          }
          else if (data.status === 403) {
            that.renderError('Пара логин/пароль неверна');
          }
        },
        error: function() {
          that.renderError('Неизвестная ошибка. Попробуйте позже.');
        }
      });
    }
  });

  return new UserModel();

});
