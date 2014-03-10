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
            
            //Events.on('updateTask', this.updateTask, this);

            this.taskHeader = _.template($('#task-header-template').html());
            this.taskBody   = _.template($('#task-body-template').html());
        },

        render: function(options) {
            this.task = options.task;
            $('#task-header').html( this.taskHeader(this.task.toJSON()) );
            $('#task-body').html( this.taskBody(this.task.toJSON()) );
        },

        updateTask: function(obj) {
            //(obj.status) ? this.$el.css({'background': 'green'}) : this.$el.css({'background': '#efefef'})
        }

    });

    return TaskView;

});