define([
	'backbone',
	'tmpl/signup'
], function (Backbone, tmpl) {
	var SignupView = Backbone.View.extend({
		initialize: function() {
			this.$page = $('#page');
		},
		events: {
			'submit form': 'signup'
		},
		template: function() {
			return tmpl();
		},
		render: function() {
			this.$el.html(this.template());
			this.$page.html(this.$el);
			this.$error = $('#error');
		},
		signup: function(e) {
			e.preventDefault();
			var form = this.$el.find('form'),
			      data = form.serialize(),
			      url = form.attr('action'),
			      that = this;

			$.ajax({
				url: url,
				type: "POST",
				data: data,
				dataType: "json",
				success: function(data) {
					if (data.status == 200) {
						window.location.href = '#login'
					}
					else if (data.status == 400) {
						that.renderError("Такой пользователь уже существует");
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
	
	return new SignupView();
});