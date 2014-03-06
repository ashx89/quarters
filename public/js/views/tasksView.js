define([
    'backbone',
    'js/collections/tasks',
    'js/views/subviews/TasksListView'

], function(Backbone, Tasks, TasksListView) {

    var TasksView = Backbone.View.extend({

        el: '#tasks',

        events: {
            /* Add new task events
            ------------------------------------------------ */
            'click #add-new-task':  'openModal',
            'click .modal-overlay': 'closeModal',
            'click #btn-task-new':  'newTask'
        },

        initialize: function(options) {

            _.bindAll(this, 'newTask', 'openModal', 'closeModal');

            this.modal      = $('[data-modal="new-task');
            //this.collection = new Tasks();
            this.tasksList  = new TasksListView({ collection: new Tasks([], {id: options.projectId}) });

            this.subRender(options);
            this.subviews.push(this.taskList);
        },

        render: function() {},

        newTask: function(e) {
            e.preventDefault();

            var task = {
                id:    new Date().getTime().toString(),
                title: document.getElementById('input-project-title').value,
                completed: false
            };

            this.collection.create(project, {wait: true});
            this.modal.addClass('hidden')

        },

        subRender: function(options) {

            $('#tasks-container .tasks-header').show().find('h3').html(options.projectTitle)
            $('#tasks-container .tasks-body ul').html(this.tasksList.render().el)
        },

        openModal: function(e) {
            e.preventDefault();
            this.modal.removeClass('hidden');
        },

        closeModal: function() {
            this.modal.addClass('hidden');
        },

    });

    return TasksView;

});