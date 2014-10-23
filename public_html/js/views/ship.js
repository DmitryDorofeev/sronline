define([
    'jquery',
    'backbone',
    'resources',
    'views/stage',
    'models/ship'
], function ($, Backbone, resources, stageView, shipModel) {

    var ShipView = Backbone.View.extend({
        tagName: 'canvas',
        id: 'ship',
        className: 'ship',
        model: shipModel,
        initialize: function () {
            // this.listenTo(stageView, 'move:done', this.moveDone);
            this.ctx = this.el.getContext('2d');
            resources.load(['/images/ship.gif']);
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            this.model.setCenter({
                x: this.el.width / 2,
                y: this.el.height / 2
            });
            this.shipPos = {
                x: this.el.width / 2 - 35,
                y: this.el.height / 2 - 35
            };
            this.inMove = false;
            this.loaded = false;
        },
        events: {
            'click': 'move',
            'mousemove': 'mousemove'
        },
        render: function () {
            var that = this;
            resources.onReady(function () {
                that.loaded = true;
                that.image = resources.get('/images/ship.gif');
                that.ctx.translate(that.el.width / 2, that.el.height / 2);
                that.ctx.drawImage(that.image, -35, -35, 70, 70);
            });
            return this;
        },
        move: function (event) {
            this.model.setClickCoords({
                x: event.pageX,
                y: event.pageY
            });
            this.rotate(event);
            this.inMove = true;
        },
        moveDone: function () {
            this.inMove = false;
        },
        mousemove: function (event) {
            if (!(this.inMove) && this.loaded) {
                var ctx = this.ctx;
                ctx.clearRect(-35, -35, 70, 70);
                ctx.save();
                this.angle = Math.atan2(event.pageY - this.el.height / 2, event.pageX - this.el.width / 2) + Math.PI/2;
                ctx.rotate(this.angle);
                ctx.drawImage(this.image, -35, -35, 70, 70);
                ctx.restore();
            }
        },
        rotate: function (event) {
            var ctx = this.ctx;
            ctx.clearRect(-35, -35, 70, 70);
            ctx.save();
            var newAngle = Math.atan2(event.pageY - this.el.height / 2, event.pageX - this.el.width / 2) + Math.PI/2;
            this.angle -= 2;
            ctx.rotate(newAngle);
            ctx.drawImage(this.image, -35, -35, 70, 70);
            ctx.restore();
        }
    });

    return new ShipView();

});