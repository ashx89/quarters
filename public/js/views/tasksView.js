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

        initialize: function() {

            this.taskList = new TasksListView({ el: '#tasks-container', collection: new Tasks() });
            
            this.subviews.push(this.taskList);
        },

        render: function() {},

        subRender: function() {

            this.$el.append(this.taskList.render().el);

        }

    });

    return TasksView;

});