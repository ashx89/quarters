define([
    'backbone',
    'js/events/events',
    'js/collections/projects',
    'js/views/subviews/ProjectListView'

], function(Backbone, Events, Projects, ProjectListView) {

    var ProjectView = Backbone.View.extend({

        el: '#sidebar',

        events: {
            'click #add-new-project': 'openModal',
            'click .modal-overlay':   'closeModal',
            'click #btn-new-project': 'newProject'
        },

        initialize: function() {

            this.projectList = new ProjectListView({ collection: new Projects() });
            this.subviews.push(this.projectList);
            
            //this.subRender();
        },

        render: function() {}

    });

    return ProjectView;

});