define([
    'backbone',
    'text!templates/project.html',
    'js/collections/tasks',
    'js/views/tasksView',

], function(Backbone, ProjectTemplate, TasksCollection, TasksContainerView) {

    var ProjectView = Backbone.View.extend({

        events: {
            'click .project-item':    'showTasks'
        },

        template: _.template(ProjectTemplate),

        initialize: function() {},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        showTasks: function(e) {
            e.preventDefault();

            var pid = $(e.target).data('id');
            new TasksContainerView([], {pid: pid, model: this.model}).render();
        }

    });

    return ProjectView;

});