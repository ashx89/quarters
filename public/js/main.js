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

		timeago:    'js/libs/timeago',
		router: 	'js/router'
	}

});

require(['js/app', 'timeago'], function(App, timeago) {

	new App();

});