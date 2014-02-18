define([
    'backbone',
    'js/collections/projects',
    'js/views/subviews/ProjectListView'

], function(Backbone, Projects, ProjectListView) {

    var ProjectView = Backbone.View.extend({

        el: '#sidebar',

        events: {
            'click #add-new-project': 'openModal',
            'click .modal-overlay':   'closeModal',
            'click #btn-new-project': 'newProject'
        },

        initialize: function() {

            this.projectList = new ProjectListView({ el: '#project-list', collection: new Projects() });
            
            this.subviews.push(this.projectList);
            this.subRender();
        },

        render: function() {},

        subRender: function() {

            this.projectList.render().el;

        }

    });

    return ProjectView;

});