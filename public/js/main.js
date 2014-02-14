'use strict';

require.config({

	baseUrl: '/',

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
		jquery: 	'js/libs/jquery.min',
		backbone: 	'js/libs/backbone-min',
		underscore: 'js/libs/underscore-min',
		text: 		'js/libs/requirejs-text',

		router: 	'js/router'
	}

});

require(['js/app'], function(App) {

	new App();

});