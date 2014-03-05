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
            'click #add-new-task':  'showModal',
            'click .modal-overlay': 'closeModal',
            'click #btn-task-new':  'newTask'
        },

        initialize: function(options) {

            this.tasksList = new TasksListView({ collection: new Tasks([], {id: options.projectId}) });
            this.subviews.push(this.taskList);

            this.subRender(options);
        },

        render: function() {},

        subRender: function(options) {

            $('#tasks-container .tasks-header').show().find('h3').html(options.projectTitle)
            $('#tasks-container .tasks-body ul').html(this.tasksList.render().el)
        }

    });

    return TasksView;

});