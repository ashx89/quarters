define([
    'backbone',
    'js/events/events',
    'js/views/ProjectView',
    'js/views/TasksView',
    'js/views/TaskView'

], function(Backbone, Events, ProjectView, TasksView, TaskView) {

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {

            this.subviews = [];

            Events.on('TasksListView', this.tasksRender, this);
            Events.on('TaskView', this.taskRender, this);

            this.projectView = new ProjectView();
            this.tasksView   = new TasksView();
            this.taskView    = new TaskView();

            this.subviews.push(this.projectView);
            this.subviews.push(this.tasksView);
            this.subviews.push(this.taskView);

            console.log('app', this.subviews);
        },

        render: function() {},

        tasksRender: function(obj) {
            this.tasksView.render({ projectId: obj.pid, projectTitle: obj.title})
        },

        taskRender: function(obj) {
            this.taskView.render({task: obj.task})
        }

    });

    return AppView;

});