define([
	'backbone'
], function (Backbone) {
	var EnemyModel = Backbone.Model.extend({
		defaults: {
			inGame: false
		},
		initialize: function () {
			this.connection = new WebSocket('ws://127.0.0.1:8000/api/v1/pull');
		},
		connect: function () {
			this.set('login', 'root');
		},
		message: function () {

		},
		send: function () {
			if (this.connection !== undefined) {
				
			}
		}
	});
});