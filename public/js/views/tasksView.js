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

        initialize: function() {

            _.bindAll(this, 'newTask', 'openModal', 'closeModal');

        },

        render: function(options) {
            this.collection = new Tasks([], {id: options.projectId});
            this.tasksList  = new TasksListView({ collection: this.collection });

            this.projectId = options.projectId;

            this.subRender(options);
            this.subviews.push(this.taskList);
        },

        newTask: function(e) {
            e.preventDefault();

            var task = {
                projectid: this.projectId,
                id: new Date().getTime().toString(),
                title: $('#input-task-title').val(),
                completed: false
            };

            this.collection.create(task, {wait: true});
            this.closeModal();

            //Events.trigger('TasksListView', {pid: task.projectid, title: task.title});
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
        },

    });

    return TasksView;

});