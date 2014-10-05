require([
  'jquery',
  'backbone',
  'routes',
  'views/app'
], function($, Backbone, router, appView) {
    Backbone.history.start();
});
