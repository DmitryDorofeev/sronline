define([
    'jquery',
    'backbone',
    'resources',
    'views/ship'
], function ($, Backbone, resources, shipView) {
    var StageView = Backbone.View.extend({
        tagName: 'canvas',
        id: 'stage',
        className: 'stage',
        initialize: function () {
            this.listenTo(shipView, 'move:start', this.move);
            this.on('move:done', shipView.moveDone, shipView);
            this.ctx = this.el.getContext('2d');
            resources.load(['/images/space1.jpg']);
        },
        render: function() {
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            this.xpos = 1500 - (this.el.width / 2);
            this.ypos = 1500 - (this.el.height / 2);
            var that = this;
            resources.onReady(function () {
                that.ctx.drawImage(resources.get('/images/space1.jpg'), that.xpos, that.ypos, that.el.width, that.el.height, 0, 0, that.el.width, that.el.height);
            });
            this.ctx.stroke();
            return this;
        },
        move: function (event) {
            if (this.motion) {
                clearInterval(this.motion);
            }
            this.targetX = this.xpos + (event.pageX - this.el.width / 2);
            this.targetY = this.ypos + (event.pageY - this.el.height / 2);
            var that = this;
            var xSpeed = (event.pageX - this.el.width / 2) * 2;
            var ySpeed = (event.pageY - this.el.height / 2) * 2;
            console.log(xSpeed + ' ' + ySpeed);
            this.motion = setInterval(function () {
                    that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
                    that.ctx.drawImage(resources.get('/images/space1.jpg'), that.xpos, that.ypos, that.el.width, that.el.height, 0, 0, that.el.width, that.el.height);
                    that.ctx.restore();
                    if (Math.abs(xSpeed) >= Math.abs(ySpeed)) {
                        that.xpos += xSpeed / Math.abs(xSpeed);
                        that.ypos += ySpeed / Math.abs(ySpeed) * Math.abs(ySpeed/xSpeed);
                    }
                    else {
                        that.ypos += ySpeed / Math.abs(ySpeed);
                        that.xpos += xSpeed / Math.abs(xSpeed) * Math.abs(xSpeed/ySpeed);
                    }
                    // console.log(that.xpos + ' ' + that.targetX + ' ' + (that.xpos - that.targetX));
                    if ((Math.abs(that.xpos - that.targetX) < 1) && (Math.abs(that.ypos - that.targetY) < 1)) {
                        console.log('done');
                        that.trigger('move:done', that.motion);
                    }
            }, 10);
        }
    });
    return new StageView();
});