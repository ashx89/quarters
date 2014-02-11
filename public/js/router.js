define([
	'backbone',
	'js/views/Dashboard'
], function(Backbone, Dashboard) {

	var view;

	var Router = Backbone.Router.extend({

		routes: {
			'': 		 'login',
			'dashboard': 'dashboard'
		},

		login: function() {},

		dashboard: function() {
			view = new Dashboard();
			this.render(view);
		},

		render: function(view) {
			if (this.currentView) this.currentview.close();

			this.currentview = view;
			this.currentview.render();
		}

	});

	return Router;
});