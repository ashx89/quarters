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
            this.tasksView   = new TasksView();

            this.subviews.push(this.projectView);
        },

        render: function() {},

        tasksRender: function(obj) {

            this.tasksView.render({ projectId: obj.pid, projectTitle: obj.title})
            this.subviews.push(this.tasksView);
        }

    });

    return AppView;

});