define([
    'backbone',
    'js/collections/tasks',
    'js/events/events',
    'js/views/subviews/TasksListView'

], function(Backbone, Tasks, Events, TasksListView) {

    var TasksView = Backbone.View.extend({

        el: '#tasks',

        events: {
            /* Add new task events
            ------------------------------------------------ */
            'click #add-new-task':  'openModal',
            'click .modal-overlay': 'closeModal',
            'click #btn-task-new':  'newTask'
        },

        initialize: function() {

            this.subviews = [];
            _.bindAll(this, 'newTask', 'openModal', 'closeModal');
        },

        render: function(options) {

            this.projectId   = options.projectId;

            this.collection  = new Tasks([], {id: options.projectId});
            this.tasksList   = new TasksListView({ collection: this.collection });

            this.subviews.push(this.tasksList);
            this.subRender(options);
            return this;
        },

        newTask: function(e) {
            e.preventDefault();

            var task = {
                projectid: this.projectId,
                id:        new Date().getTime().toString(),
                title:     $('#input-task-title').val(),
                tags:      $('#input-tags').val(),
                deadline:  $('#input-end-date').val(),
                completed: false
            };

            this.collection.create(task, {wait: true});
            this.collection.fetch(); // hmm?
            this.closeModal();
        },

        subRender: function(options) {

            $('#tasks-container .tasks-header').show().find('h3').html(options.projectTitle)
            $('#tasks-container .tasks-body ul').html(this.tasksList.render().el)
        },

        openModal: function(e) {
            e.preventDefault();
            var template = _.template($('#task-modal-template').html());
            $('#tasks-modal-container').html(template());
        },

        closeModal: function() {
            $('#tasks-modal-container').empty();
        }

    });

    return TasksView;

});