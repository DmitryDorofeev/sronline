define([
	'jquery',
	'underscore',
	'backbone',
	'tmpl/main',
	'tmpl/game',
	'tmpl/login',
	'tmpl/signup'
], function($, _, Backbone) {

	$page = $('#page');

	var Router = Backbone.Router.extend({
		routes: {
			"": "index",
			"game": "game",
			"login": "login",
			"signup": "signup"
		},
		index: function() {
			$page.html(mainTmpl()); //так и оставим
		},
		game: function() {
			$page.html(gameTmpl()); // тут будет инициализация GameView
		},
		login: function() {
			$page.html(loginTmpl()); // здесь будет LoginView
		},
		signup: function() {
			$page.html(signupTmpl()); // SignupView
		}
	});

	return Router;
})