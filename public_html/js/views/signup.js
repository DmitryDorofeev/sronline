define([
	'backbone',
	'tmpl/signup'
], function (Backbone, tmpl) {
	var SignupView = Backbone.View.extend({
		
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
	
	return new SignupView();
});