define([
	'backbone',
	'js/views/Sidebar'
], function(Backbone, SidebarView) {

	var Dashboard = Backbone.View.extend({

		initialize: function() {
			var sidebar = new SidebarView();
		}

	});

	return Dashboard;

});