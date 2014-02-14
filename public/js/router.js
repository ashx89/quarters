define([
	'backbone',
	'js/collections/projects',
	'js/views/projects',
	'js/views/appView'

], function(Backbone, ProjectCollection, ProjectsView, AppView) {

	var Router = Backbone.Router.extend({

		routes: {
			'': 		 'login',
			'dashboard': 'dashboard'
		},

		initialize: function() {},

		login: function() {},

		dashboard: function() {	

			var projects = new ProjectCollection();
			new ProjectsView({ collection: projects }).render();

			new AppView({ collection: projects });
		}

	});

	return Router;
});