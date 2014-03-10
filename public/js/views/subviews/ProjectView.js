define([
    'backbone',
    'js/events/events',
    'text!templates/project.html',
    'js/views/subviews/TasksListView',

], function(Backbone, Events, ProjectTemplate, TasksListView) {

    var ProjectView = Backbone.View.extend({

        events: {
            'click .project-item': 'showTasks'
        },

        template: _.template(ProjectTemplate),

        initialize: function() {},

        render: function() {
            this.$el.html(this.template( this.model.toJSON() ));
            return this;
        },

        showTasks: function(e) {
            e.preventDefault();

            var pid   = $(e.target).data('id');
            var title = $(e.target).data('title');

            Events.trigger('TasksListView', {pid: pid, title: title});
        }

    });

    return ProjectView;

});