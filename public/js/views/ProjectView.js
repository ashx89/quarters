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
        },

        newProject: function(e) {
            e.preventDefault();

            console.log('new')

            var project = {
                id: new Date().getTime().toString(),
                title: document.getElementById('input-project-title').value
            };

            Projects.create(project, {wait: true});
            $('[data-modal="new-project').addClass('hidden')
        },

        openModal: function(e) {
            e.preventDefault();
            $('[data-modal="new-project').removeClass('hidden');
        },

        closeModal: function() {
            $('[data-modal="new-project').addClass('hidden');
        },

        render: function() {}

    });

    return ProjectView;

});