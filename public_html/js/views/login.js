define([
	'backbone',
	'tmpl/login'
], function (Backbone, tmpl) {
	var LoginView = Backbone.View.extend({
		
		initialize: function() {
			this.$page = $('#page');
		},
		template: function() {
			return tmpl();
		},
		render: function() {
			this.$el.html(this.template());
			this.$page.html(this.$el);
		}
	});
	
	return new LoginView();
});