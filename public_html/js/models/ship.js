define([
    'backbone'
], function (Backbone) {
    var ShipModel = Backbone.Model.extend({
        initialize: function () {
            this.on('change', this.sendData, this);
            this.connection = new WebSocket('ws://127.0.0.1:8000/api/v1/push');
        },
        sendData: function () {

        }
    });

    return new ShipModel();
});