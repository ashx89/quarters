'use strict';

require.config({

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	},

	paths: {
		jquery: 	'libs/jquery.min',
		backbone: 	'libs/backbone-min',
		underscore: 'libs/underscore-min',
	}

});

require(['backbone'], function(Backbone) {

    Backbone.history.start({
        pushState: true,
        root: '/'    
    });

});