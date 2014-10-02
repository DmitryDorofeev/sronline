define([
	'jquery',
	'backbone',
	'tmpl/header',
	'models/user'
], function($, Backbone, tmpl, userModel) {

	var HeaderView = Backbone.View.extend({
		className: 'header',
		template: function() {
			return tmpl(this.model.toJSON());
		},
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		events: {
			'click .js-logout': 'logout'
		},
		render: function() {
			this.$el.html(this.template());
			$('body').prepend(this.$el);
		},
		logout: function() {
			userModel.clear();
			$.ajax({
				type: 'POST',
				url: '/api/v1/auth/logout'
			}).done(function() {
				window.location.href = '#';
			});
		}
	});

	return new HeaderView({model: userModel});

});
