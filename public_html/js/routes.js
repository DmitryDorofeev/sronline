define([
  'jquery',
  'backbone',
  'views/home',
  'views/game',
  'views/login',
  'views/signup',
  'views/profile',
  'views/scoreboard',
  'views/app'
], function($, Backbone, homeView, gameView, loginView, signupView, profileView, scoreboardView, manager) {

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
      manager.subscribe(homeView);
      homeView.show();
    },
    game: function() {
      manager.subscribe(gameView);
      gameView.show();
    },
    login: function() {
      manager.subscribe(loginView);
      loginView.show();
    },
    signup: function() {
      manager.subscribe(signupView);
      signupView.show();
    },
    profile: function() {
      manager.subscribe(profileView);
      profileView.show();
    },
    scoreboard: function() {
      manager.subscribe(scoreboardView);
      scoreboardView.show();
    },
    default: function () {
      alert('404');
    }
  });

  return new Router();
});
