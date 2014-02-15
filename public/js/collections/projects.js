define([
    'backbone',
    'js/models/project'
], function(Backbone, ProjectModel) {

    var Projects = Backbone.Collection.extend({
        model: ProjectModel,
        url: '/project/'
    });

    return Projects;

});