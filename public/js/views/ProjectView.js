define([
    'backbone',
    'js/events/events',
    'js/collections/users',
    'js/collections/projects',
    'js/views/subviews/UsersListView',
    'js/views/subviews/ProjectListView'

], function(Backbone, Events, Users, Projects, UsersListView, ProjectListView) {

    var ProjectView = Backbone.View.extend({

        el: '#sidebar',

        events: {
            'click #add-new-project': 'openModal',
            'click .modal-overlay':   'closeModal',
            'click #btn-new-project': 'newProject',

            'click #add-new-team': 'openModal',
            'click #btn-new-team': 'newTeam',
        },

        initialize: function() {

            this.subviews = [];

            _.bindAll(this, 'newProject', 'openModal', 'closeModal');

            Events.on('UsersListView', this.renderUserList, this);

            this.collection  = new Projects();
            this.projectList = new ProjectListView({ collection: this.collection });

            this.subviews.push(this.projectList);
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

        newTeam: function(e) {
            e.preventDefault();

            var user = {
                username: document.getElementById('input-team-username').value
            };

            this.userCollection.create(user, {wait: true});
            this.userCollection.fetch()
            //console.log(this.collection)
            //this.collection.save();

           // this.collection.create(team, {wait: true});
            //this.modal.addClass('hidden');
        },

        renderUserList: function(obj) {
            
            this.userCollection = new Users([], {id: obj.pid});
            new UsersListView({ collection: this.userCollection });

        },

        openModal: function(e) {
            e.preventDefault();

            this.modal = $('[data-modal="new-' + $(e.target).data('target') + '"]');
            this.modal.removeClass('hidden');
        },

        closeModal: function() {
            this.modal.addClass('hidden');
        },

        render: function() {}

    });

    return ProjectView;

});