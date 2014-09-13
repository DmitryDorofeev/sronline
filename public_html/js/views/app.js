define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	
	var AppView = Backbone.View.extend({
		render: function() {
			alert("Rendered");
		}
	});

	return AppView;

});