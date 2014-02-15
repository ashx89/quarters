define([
    'backbone',
    'js/models/project',
    'text!templates/project.html',
    'js/collections/tasks',
    'js/views/tasks'

], function(Backbone, ProjectModel, ProjectTemplate, TasksCollection, TasksView) {

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

            this.projectId = this.model.id;

            this.tasks = new TasksCollection([], {id: this.projectId});
            new TasksView({ collection: this.tasks }).render();
        }

    });

    return ProjectView;

});