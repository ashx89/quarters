define([
    'backbone',
    'js/events/events',
    'js/views/subviews/TasksListView',

], function(Backbone, Events, TasksListView) {

    var ProjectView = Backbone.View.extend({

        events: {
            'click .project-item a': 'showTasks'
        },

        template: _.template( $('#project-item-template').html() ),

        initialize: function() {},

        render: function() {
            this.$el.html(this.template( this.model.toJSON() ));
            return this;
        },

        showTasks: function(e) {
            e.preventDefault();

            var target = $(e.target).parent().parent();
            target.addClass('active-project').siblings().removeClass('active-project');

            var pid   = $(e.target).data('id');
            var title = $(e.target).data('title');

            Events.trigger('TasksListView', {pid: pid, title: title});
            Events.trigger('UsersListView', {pid: pid});
            Events.trigger('clearTaskView');
        }

    });

    return ProjectView;

});