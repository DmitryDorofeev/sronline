define([
    'backbone'
], function (Backbone) {
    var ShipModel = Backbone.Model.extend({
        initialize: function () {
            this.on('change', this.sendData, this);
            this.connection = new WebSocket('ws://127.0.0.1:8000/api/v1/push');
            this.center = {x: 600, y: 400};
        },
        sendData: function () {
            console.log("Sending data");
        },
        setCenter: function (coords) {
            this.center = coords;
        },
        setClickCoords: function (coords) {
            var dx = this.center.x - coords.x,
                dy = this.center.y - coords.y;
            this.set({type: 'move', x: dx, y: dy});
            this.trigger('move:start', {x: dx, y: dy});
        },
        setSunPos: function (centerPos) {
            this.sunPos.x = centerPos.x + 55; // TODO: допилить на рандом
            this.sunPos.y = centerPos.y + 55;
        },
        getSunPos: function () {
            return this.sunPos;
        }
    });

    return new ShipModel();
});