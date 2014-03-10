define([
    'backbone',
    'js/events/events'

], function(Backbone, Events) {

    var TaskView = Backbone.View.extend({

        el: '#task',

        events: {
            /* Add new task events
            ------------------------------------------------ */
        },

        initialize: function(options) {
            // _.bindAll(this, 'newTask', 'openModal', 'closeModal');
            
            Events.on('updateTask', this.updateTask, this);
            Events.on('clearTaskView', this.clearView, this);

            this.taskHeader = _.template($('#task-header-template').html());
            this.taskBody   = _.template($('#task-body-template').html());
        },

        render: function(options) {
            this.task = options.task;
            $('#task-header').html( this.taskHeader(this.task.toJSON()) );
            $('#task-body').html( this.taskBody(this.task.toJSON()) );
        },

        updateTask: function(task) {
            var status = task.attributes.completed;
            (status) ? this.$el.addClass('completed-' + status) : this.$el.removeClass('completed-' + !status);
        },

        clearView: function() {
            $('#task-header').empty();
            $('#task-body').empty();
        }

    });

    return TaskView;

});