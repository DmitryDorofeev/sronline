define([
	'jquery',
	'underscore',
	'backbone',
	'tmpl/main',
	'tmpl/game',
	'tmpl/login',
	'tmpl/signup'
], function($, _, Backbone, mainTmpl) {
	var Router = Backbone.Router.extend({
		routes: {
			"": "index",
			"game": "game",
			"login": "login",
			"signup": "signup"
		},
		index: function() {
			$('#page').html(mainTmpl());
		},
		game: function() {
			$('#page').html(gameTmpl());
		},
		login: function() {
			$('#page').html(loginTmpl());
		},
		signup: function() {
			$('#page').html(signupTmpl());
		}
	});

	return Router;
})