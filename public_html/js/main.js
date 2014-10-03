require([
  'jquery',
  'backbone',
  'routes',
  'views/header'
], function($, Backbone, router, headerView) {

    Backbone.history.start();
    headerView.render();

});
