require.config({
    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone'
    },
    shim: {
        'tmpl/main': {
            exports: 'mainTmpl'
        },
        'tmpl/game': {
            exports: 'gameTmpl'
        },
        'tmpl/login': {
            exports: 'loginTmpl'
        },
        'tmpl/signup': {
            exports: 'signupTmpl'
        }
    }
});

require(['backbone','routes/routes'], function(Backbone, Router) {
    var router = new Router();
    Backbone.history.start();
});