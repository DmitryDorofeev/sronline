require.config({
    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquerybp': {
            deps: ['jquery']
        }
    }
})

require(['jquery','backbone','routes/routes'], function($, Backbone, router) {

    Backbone.history.start();

    
});
