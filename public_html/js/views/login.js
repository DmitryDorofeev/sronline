define([
	'jquery',
	'backbone',
	'tmpl/login'
], function ($, Backbone, tmpl) {
	var LoginView = Backbone.View.extend({
		initialize: function() {
			this.$page = $('#page');
		},
		events: {
			'submit form': 'login'
		},
		template: function() {
			return tmpl();
		},
		render: function() {
			this.$el.html(this.template());
			this.$page.html(this.$el);
			this.$error = $('#error');
		},
		login: function(e) {
			e.preventDefault();
			var form = this.$el.find('form');
			var login = form.find('input[name=login]').val();
			var password = form.find('input[name=password]').val();
			var url = form.attr('action');
			var that = this;
			$.ajax({
				url: url,
				type: "POST",
				data: {
					"login": login,
					"password": password
				},
				dataType: "json",
				success: function(data) {
					if (data.status == 200) {
						window.location.href = '#game'
					}
					else if (data.status == 404) {
						that.renderError("Пара логин/пароль неверна");
					}
				},
				error: function() {
					that.renderError("Неизвестная ошибка. Попробуйте позже.");
				}
			});
		},
		renderError: function(msg) {
			this.$error.text(msg);
		}
	});
	
	return new LoginView();
});