define([
    'backbone',
    'js/events/events',
    'js/views/ProjectView',
    'js/views/TasksView'

], function(Backbone, Events, ProjectView, TasksView) {

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {

            Events.on('TasksListView', this.tasksRender, this);

            this.projectView = new ProjectView();

            this.subviews.push(this.projectView);
        },

        render: function() {},

        tasksRender: function(id) {
            this.tasksView = new TasksView({ projectId: id});
            this.subviews.push(this.tasksView);
        }

    });

    return AppView;

});