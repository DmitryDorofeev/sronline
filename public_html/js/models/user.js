define([
	'backbone'
], function(Backbone) {
	var UserModel = Backbone.Model.extend({
		url: "/api/v1/auth/signin",
		initialize: function() {

		}
	});

	var userModel = new UserModel();

	userModel.fetch();

	return userModel;

});
