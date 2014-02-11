define([
	'backbone',
	'text!templates/sidebar.html'
], function(Backbone, SidebarTemplate) {

	var Sidebar = Backbone.View.extend({

		el: '#sidebar',

		template: _.template(SidebarTemplate),

		initialize: function() {
			this.$el.html(this.template);
		}

	});

	return Sidebar;

});