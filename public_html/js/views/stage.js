define([
    'jquery',
    'backbone',
    'resources'
], function ($, Backbone, resources) {
    var StageView = Backbone.View.extend({
        tagName: 'canvas',
        className: 'stage',
        events: {
            'click': 'move',
            'mousemove': 'mousemove'
        },
        initialize: function () {
            this.ctx = this.el.getContext('2d');
            resources.load(['/images/ship.gif']);
            resources.load(['/images/space1.jpg']);
        },
        render: function() {
            this.el.width = $('body').width();
            this.el.height = $('body').height();
            this.xpos = 1500 - (this.el.width / 2);
            this.ypos = 1500 - (this.el.height / 2);
            var that = this;
            resources.onReady(function () {
                that.ctx.drawImage(resources.get('/images/ship.gif'), that.el.width / 2 - 30, that.el.height / 2 - 30, 60, 60);
            });
            this.ctx.stroke();
            return this;
        },
        move: function (e) {
            if (this.motion) {
                clearInterval(this.motion);
            }
            // console.log(e.pageX + ' ' + e.pageY);
            this.targetX = this.xpos + (e.pageX - this.el.width / 2) - 30;
            this.targetY = this.ypos + (e.pageY - this.el.height / 2) - 30;
            // $('<div/>').css({'position': 'absolute', 'top': e.pageY, 'left': e.pageX, 'width': 10, 'height': 10, 'background-color': 'white', 'z-index': 999}).appendTo('body');
            var that = this;
            var xSpeed = (e.pageX - this.el.width / 2 - 30) * 2;
            var ySpeed = (e.pageY - this.el.height / 2 - 30) * 2;
            console.log(ySpeed / Math.abs(ySpeed));
            this.motion = setInterval(function () {
                    that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
                    that.ctx.drawImage(resources.get('/images/space1.jpg'), that.xpos, that.ypos, that.el.width, that.el.height, 0, 0, that.el.width, that.el.height);
                    that.ctx.drawImage(resources.get('/images/ship.gif'), that.el.width / 2 - 30, that.el.height / 2 - 30, 60, 60);
                    if (xSpeed >= ySpeed) {
                        that.xpos += xSpeed / Math.abs(xSpeed);
                        that.ypos += ySpeed / Math.abs(ySpeed) * Math.abs(ySpeed/xSpeed);
                    }
                    else {
                        that.ypos += ySpeed / Math.abs(ySpeed);
                        that.xpos += xSpeed / Math.abs(xSpeed) * Math.abs(xSpeed/ySpeed);
                    }
                    console.log(that.xpos + ' ' + that.targetX + ' ' + (that.xpos - that.targetX));
                    if ((Math.abs(that.xpos - that.targetX) < 3) && (Math.abs(that.ypos - that.targetY) < 3)) {
                        console.log('done');
                        that.trigger('motion:done', that.motion);
                    }
            }, 10);
        },
        mousemove: function (e) {
            // console.log(e.pageX + ' ' + e.pageY);
        }
    });
    return new StageView();
});