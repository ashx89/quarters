define([
    'backbone',
    'js/models/project',
    'text!templates/project.html'

], function(Backbone, ProjectModel, ProjectTemplate) {

    var ProjectView = Backbone.View.extend({

        template: _.template(ProjectTemplate),
        //template: _.template( $('#project-list-template').html() ),

        initialize: function() {},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return ProjectView;

});