require(['jquery','backbone','routes/routes', 'views/header'], function($, Backbone, router, headerView) {

    Backbone.history.start();
    headerView.render();

});