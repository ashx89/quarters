define([
    'backbone',
    'js/events/events',
    'js/views/ProjectView',
    'js/views/TasksView',
    'js/views/TaskView'

], function(Backbone, Events, ProjectView, TasksView, TaskView) {

    var AppView = Backbone.View.extend({

        el: 'body',

        events: {
            'click #nav #nav-settings': 'showOptions'
        },

        initialize: function() {

            this.subviews = [];

            Events.on('TasksListView', this.tasksRender, this);
            Events.on('TaskView', this.taskRender, this);

            this.projectView = new ProjectView();

            this.subviews.push(this.projectView);
            console.log('app', this.subviews);
        },

        render: function() {},

        tasksRender: function(obj) {

            if (this.currentView) this.currentView.close();

            this.tasksView   = new TasksView();
            this.currentView = this.tasksView;
            this.tasksView.render({ projectId: obj.pid, projectTitle: obj.title})
        },

        taskRender: function(obj) {

            if (this.currentView) this.currentView.close();

            this.taskView    = new TaskView();
            this.currentView = this.taskView;
            this.taskView.render({task: obj.task})
        },

        showOptions: function(e) {
            e.preventDefault();
            $('.dropdown').toggle();
        }

    });

    return AppView;

});