define([
	'backbone',
	'tmpl/scoreboard'
], function (Backbone, tmpl) {
	var ScoreboardView = Backbone.View.extend({
		
		initialize: function() {
			this.$page = $('#page');
		},
		template: function() {
			return tmpl();
		},
		render: function() {
			this.$el.append(this.template());
			this.$page.html(this.$el);
		}
	});
	
	return new ScoreboardView();
});