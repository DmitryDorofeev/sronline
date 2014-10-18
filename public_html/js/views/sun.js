define([
    'jquery',
    'backbone',
    'resources',
    'views/ship'
], function ($, Backbone, resources, shipView) {
    var SunView = Backbone.View.extend({
        tagName: 'canvas',
        id: 'sun',
        className: 'sun',
        initialize: function () {
            this.listenTo(shipView, 'move:start', this.move);
            this.ctx = this.el.getContext('2d');
            resources.load(['/images/sun.png']);
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            this.sunPos = {
                x: this.el.width / 2 + 55,
                y: this.el.height / 2 + 55
            };
            this.inMove = false;
            this.loaded = false;
        },
        render: function () {
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            var that = this;
            resources.onReady(function () {
                that.ctx.drawImage(resources.get('/images/sun.png'), that.el.width / 2 + 55, that.el.height / 2 + 55, 220, 220);
            });
            this.ctx.stroke();
            return this;
        },
        move: function (sun) {
            this.targetX = sun.event.pageX;
            this.targetY = sun.event.pageY;
            if (this.motion) {
                this.trigger('move:done', 'moveSun');
            }
            // this.model.set({
            //     targetX: this.targetX, 
            //     targetY: this.targetY
            // });
            this.xSpeed = (sun.event.pageX - this.el.width / 2);
            this.ySpeed = (sun.event.pageY - this.el.height / 2);
            this.trigger('move:start', {context: this, callback: this.motion, time: 10, name: 'moveSun'});
        },
        motion: function () {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.drawImage(resources.get('/images/sun.png'), this.sunPos.x, this.sunPos.y, 220, 220);
            this.ctx.restore();
            if (Math.abs(this.xSpeed) >= Math.abs(this.ySpeed)) {
                this.sunPos.x -= this.xSpeed / Math.abs(this.xSpeed);
                this.targetX -= this.xSpeed / Math.abs(this.xSpeed);
                this.sunPos.y -= this.ySpeed / Math.abs(this.ySpeed) * Math.abs(this.ySpeed/this.xSpeed);
                this.targetY -= this.ySpeed / Math.abs(this.ySpeed) * Math.abs(this.ySpeed/this.xSpeed);
            }
            else {
                this.sunPos.y -= this.ySpeed / Math.abs(this.ySpeed);
                this.targetY -= this.ySpeed / Math.abs(this.ySpeed);
                this.sunPos.x -= this.ySpeed / Math.abs(this.ySpeed) * Math.abs(this.xSpeed/this.ySpeed);
                this.targetX -= this.ySpeed / Math.abs(this.ySpeed) * Math.abs(this.xSpeed/this.ySpeed);
            }
            if ((Math.abs(this.el.width / 2 - Math.abs(this.targetX)) < 2) && (Math.abs(this.el.height / 2 - Math.abs(this.targetY)) < 2)) {
                this.trigger('move:done', 'moveSun');
            }
        }
    });

    return new SunView();
});