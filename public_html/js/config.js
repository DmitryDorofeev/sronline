require.config({
    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone'
    }
});

require(['views/app'], function(AppView) {
    var appView = new AppView();
    appView.render();
});