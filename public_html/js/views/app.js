define([
	'jquery',
	'backbone'
], function($, Backbone) {
	
	var AppView = Backbone.View.extend({
		render: function() {
			alert("Rendered");
		}
	});

	return new AppView();

});