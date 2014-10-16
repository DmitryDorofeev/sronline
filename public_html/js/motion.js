define([
    'underscore',
    'backbone',
    'views/stage'
], function (_, Backbone, stageView) {
    var motionController = {};
    _.extend(motionController, Backbone.Events);

    motionController.listenTo(stageView, 'motion:done', function (interval) {
        clearInterval(interval);
    });

});