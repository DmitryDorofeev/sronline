define([
  'jquery',
  'backbone',
  'views/home',
  'views/game',
  'views/login',
  'views/signup',
  'views/profile',
  'views/scoreboard'
], function($, Backbone, homeView, gameView, loginView, signupView, profileView, scoreboardView) {

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'game': 'game',
      'login': 'login',
      'signup': 'signup',
      'profile': 'profile',
      'scoreboard': 'scoreboard',
      '*other': 'default'
    },
    index: function() {
      homeView.show();
    },
    game: function() {
      gameView.show();
    },
    login: function() {
      loginView.show();
    },
    signup: function() {
      signupView.show();
    },
    profile: function() {
      profileView.show();
    },
    scoreboard: function() {
      scoreboardView.show();
    },
    default: function () {
      alert('oppa');
    }
  });

  return new Router();
});
