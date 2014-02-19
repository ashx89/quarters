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
        },

        render: function() {}

    });

    return TasksView;

});