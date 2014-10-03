define([
	'jquery',
	'backbone',
	'views/home',
	'views/game',
	'views/login',
	'views/signup',
	'views/profile'
], function($, Backbone, homeView, gameView, loginView, signupView, profileView) {

	var $page = $('#page');

	var Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'game': 'game',
			'login': 'login',
			'signup': 'signup',
			'profile': 'profile',
			'scoreboard': 'scoreboard'
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
		profile: function() {
			profileView.render();
		},
		scoreboard: function() {
			
		}
	});

	return new Router();
});
