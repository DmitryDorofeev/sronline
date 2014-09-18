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
})

require(['jquery','backbone','routes/routes'], function($, Backbone, Router) {
    var router = new Router()
    Backbone.history.start()
    var login, password
    $('#login_form').submit(function(e){
	    e.preventDefault()
	    form = $(this)
	    login = form.find('input[name=login]').val()
	    password = form.find('input[name=password]').val()
	    url = form.attr('action')
	    $.post(url, {login: login, password: password}, function(data) {
		    console.log(data)
	    })
    })
    
});