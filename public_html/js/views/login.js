define([
	'jquery',
	'backbone',
	'tmpl/login',
	'models/user'
], function ($, Backbone, tmpl, userModel) {
	var LoginView = Backbone.View.extend({
		initialize: function() {
			this.$page = $('#page');
		},
		events: {
			'submit form': 'login'
		},
		template: tmpl,
		render: function() {
			this.$el.html(this.template());
			this.$page.html(this.$el);
			this.$error = $('#error');
		},
		login: function(e) {
			e.preventDefault();
			var form = this.$el.find('form'),
			      data = form.serialize(),
			      url = form.data('action'),
			      that = this;
			$.ajax({
				url: url,
				type: "POST",
				data: data,
				dataType: "json",
				success: function(data) {
					if (data.status == 200) {
						userModel.set("login", data.login);
						userModel.set("avatar", data.avatar);
						userModel.set("email", data.email);
						console.log(userModel.toJSON());
						window.location.href = '#game'
					}
					else if (data.status == 403) {
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
