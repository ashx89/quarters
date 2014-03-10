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

            this.subviews = [];

            _.bindAll(this, 'newProject', 'openModal', 'closeModal');

            this.modal       = $('[data-modal="new-project');
            this.collection  = new Projects();
            this.projectList = new ProjectListView({ collection: this.collection });

            this.subviews.push(this.projectList);
            console.log('project', this.subviews);
        },

        newProject: function(e) {
            e.preventDefault();

            var project = {
                id:    new Date().getTime().toString(),
                title: document.getElementById('input-project-title').value
            };

            this.collection.create(project, {wait: true});
            this.modal.addClass('hidden');
        },

        openModal: function(e) {
            e.preventDefault();
            this.modal.removeClass('hidden');
        },

        closeModal: function() {
            this.modal.addClass('hidden');
        },

        render: function() {}

    });

    return ProjectView;

});