define([
	'jquery',
	'backbone',
	'tmpl/main',
	'views/game',
	'views/login',
	'views/signup'
	'views/scoreboard'
], function($, Backbone, main, gameView, loginView, signupView, scoreboardView) {

	$page = $('#page');

	var Router = Backbone.Router.extend({
		routes: {
			"": "index",
			"game": "game",
			"login": "login",
			"signup": "signup"
			"scoreboard": "scoreboard"
		},
		index: function() {
			$page.html(main()); //так и оставим. Пока..
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