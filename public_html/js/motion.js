define([
    'underscore',
    'backbone',
    'views/stage'
], function (_, Backbone, stageView) {
    var motionController = {};
    _.extend(motionController, Backbone.Events);

    motionController.listenTo(stageView, 'move:done', function (interval) {
        clearInterval(interval);
    });

});