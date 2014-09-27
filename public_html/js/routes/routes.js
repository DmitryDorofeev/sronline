define([
	'jquery',
	'backbone',
	'views/home',
	'views/game',
	'views/login',
	'views/signup',
	'views/scoreboard'
], function($, Backbone, homeView, gameView, loginView, signupView, scoreboardView) {

	$page = $('#page');

	var Router = Backbone.Router.extend({
		routes: {
			"": "index",
			"game": "game",
			"login": "login",
			"signup": "signup",
			"scoreboard": "scoreboard"
		},
		index: function() {
			homeView.render();
		},
		game: function() {
			gameView.render();
		},
		login: function() {
			loginView.render();
		},
		signup: function() {
			signupView.render();
		},
		scoreboard: function() {
			scoreboardView.render();
		}
	});

	return new Router();
})