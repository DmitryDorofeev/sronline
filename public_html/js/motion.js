define([
    'underscore',
    'backbone',
    'views/stage',
    'views/sun'
], function (_, Backbone, stageView, sunView) {

    var MotionController = function () {
        this.intervals = {};
    }

    MotionController.prototype.newInterval =  function (params) {
        this.intervals[params.name] = setInterval(function () {
            params.callback.call(params.context)
        }, params.time);
    };

    MotionController.prototype.delInterval = function (name) {
        clearInterval(this.intervals[name])
    }

    var motionController = new MotionController();

    _.extend(motionController, Backbone.Events);

    motionController.listenTo(stageView, 'move:done', motionController.delInterval);
    motionController.listenTo(stageView, 'move:start', motionController.newInterval);
    motionController.listenTo(sunView, 'move:done', motionController.delInterval);
    motionController.listenTo(sunView, 'move:start', motionController.newInterval);


});