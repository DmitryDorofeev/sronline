define([
	'backbone',
	'tmpl/game'
], function (Backbone, tmpl) {
	var GameView = Backbone.View.extend({
		
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
	
	return new GameView();
});