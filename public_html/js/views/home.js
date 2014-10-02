define([
	'jquery',
	'backbone',
	'tmpl/main',
	'models/user'
], function($, Backbone, tmpl, userModel) {

	var homeView = Backbone.View.extend({
		initialize: function() {
			this.$page = $('#page');
		},
		events: {
			'click .button_play': 'play'
		},
		template: tmpl,
		render: function() {
			this.$el.html(this.template());
			this.$page.html(this.$el);
		},
		play: function() {
			if (userModel.get('login') !== undefined) {
				window.location.href = '#game';
			}
			else {
				window.location.href = '#login';
			}
		}
	});

	return new homeView();

});
