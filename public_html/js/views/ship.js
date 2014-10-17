define([
    'jquery',
    'backbone',
    'resources',
    'views/stage'
], function ($, Backbone, resources, stageView) {

    var ShipView = Backbone.View.extend({
        tagName: 'canvas',
        id: 'ship',
        className: 'ship',
        initialize: function () {
            // this.listenTo(stageView, 'move:done', this.moveDone);
            this.ctx = this.el.getContext('2d');
            resources.load(['/images/ship.gif']);
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            this.shipPos = {
                x: this.el.width / 2 - 30,
                y: this.el.height / 2 - 30
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
                that.ctx.drawImage(that.image, -30, -30, 60, 60);
            });
            return this;
        },
        move: function (event) {
            this.trigger('move:start', event);
            this.inMove = true;
        },
        moveDone: function () {
            console.log('azaza');
            this.inMove = false;
        },
        mousemove: function (event) {
            if (!(this.inMove) && this.loaded) {
                this.ctx.clearRect(-30, -30, 60, 60);
                this.ctx.save();
                this.ctx.rotate(Math.atan2(event.pageY - this.el.height / 2, event.pageX - this.el.width / 2) + Math.PI/2);
                this.ctx.drawImage(this.image, -30, -30, 60, 60); 
                this.ctx.restore();
            }
        }
    });

    return new ShipView();

});