define([
	'backbone',
	'js/collections/projects',
	'js/views/AppView'

], function(Backbone, ProjectCollection, AppView) {

	var Router = Backbone.Router.extend({

		routes: {
			'': 		 'login',
			'dashboard': 'dashboard'
		},

		initialize: function() {},

		login: function() {},

		dashboard: function() {	

			new AppView();

			// var projects = new ProjectCollection();
			// new ProjectsView({ collection: projects }).render();
			//new appview({ collection: projects });
		}

	});

	return Router;
});