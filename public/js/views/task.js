define([
    'backbone',
    'js/models/project',
    'text!templates/tasksList.html'

], function(Backbone, ProjectModel, TaskTemplate) {

    var TaskView = Backbone.View.extend({

        template: _.template(TaskTemplate),

        initialize: function() {},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return TaskView;

});