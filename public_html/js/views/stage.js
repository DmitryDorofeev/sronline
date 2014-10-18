define([
    'jquery',
    'backbone',
    'resources',
    'views/ship',
    'models/ship',
    'views/sun'
], function ($, Backbone, resources, shipView, shipModel, sunView) {
    var StageView = Backbone.View.extend({
        tagName: 'canvas',
        id: 'stage',
        className: 'stage',
        model: shipModel,
        initialize: function () {
            this.listenTo(sunView, 'move:done', this.moveDone);
            this.listenTo(shipView, 'move:start', this.move);
            this.on('move:done', shipView.moveDone, shipView);
            this.ctx = this.el.getContext('2d');
            resources.load(['images/space1.jpg']);
        },
        render: function() {
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            this.xpos = 1500 - (this.el.width / 2);
            this.ypos = 1500 - (this.el.height / 2);
            var that = this;
            resources.onReady(function () {
                that.ctx.drawImage(resources.get('images/space1.jpg'), that.xpos, that.ypos, that.el.width, that.el.height, 0, 0, that.el.width, that.el.height);
            });
            this.ctx.stroke();
            return this;
        },
        move: function (ship) {
            this.targetX = this.xpos + (ship.event.pageX - this.el.width / 2);
            this.targetY = this.ypos + (ship.event.pageY - this.el.height / 2);
            if (this.motion) {
                this.trigger('move:done', 'move');
            }
            this.model.set({
                targetX: this.targetX, 
                targetY: this.targetY
            });
            this.xSpeed = (ship.event.pageX - this.el.width / 2);
            this.ySpeed = (ship.event.pageY - this.el.height / 2);
            this.trigger('move:start', {context: this, callback: this.motion, time: 40, name: 'move'});
        },
        motion: function () {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.drawImage(resources.get('images/space1.jpg'), this.xpos, this.ypos, this.el.width, this.el.height, 0, 0, this.el.width, this.el.height);
            this.ctx.restore();
            if (Math.abs(this.xSpeed) >= Math.abs(this.ySpeed)) {
                this.xpos += this.xSpeed / Math.abs(this.xSpeed);
                this.ypos += this.ySpeed / Math.abs(this.ySpeed) * Math.abs(this.ySpeed/this.xSpeed);
            }
            else {
                this.ypos += this.ySpeed / Math.abs(this.ySpeed);
                this.xpos += this.xSpeed / Math.abs(this.xSpeed) * Math.abs(this.xSpeed/this.ySpeed);
            }
            if ((Math.abs(this.xpos - this.targetX) < 1) && (Math.abs(this.ypos - this.targetY) < 1)) {
                this.trigger('move:done', 'move');
            }
        },
        moveDone: function () {
            this.trigger('move:done', 'move');
        }
    });
    return new StageView();
});