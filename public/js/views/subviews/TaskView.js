define([
    'backbone',
    'js/events/events',
    'text!templates/task.html'

], function(Backbone, Events, TaskTemplate) {

    var TaskView = Backbone.View.extend({

        events: {
            'click .checkbox-label': 'setTaskStatus',
            'click .task-bin': 'deleteTask',
            'click .task-item-title': 'showTask'
        },

        template: _.template(TaskTemplate),

        initialize: function() {
            this.model.on('change', this.render, this);
            _.bindAll(this,'setTaskStatus', 'showTask');
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        setTaskStatus: function() {
            var value = (this.model.get('completed') == false) ? true : false;
            this.model.set('completed', value);
            this.model.save();

            if (value) Events.trigger('clearTaskView');
            //Events.trigger('updateTask',  this.model);
        },

        deleteTask: function(e) {
            var id = $(e.target).data('id');
            this.model.destroy({success: function(res) { console.log(res); Events.trigger('clearTaskView'); } })

        },

        showTask: function(e) {
            //var taskId = $(e.target).data('id');
            Events.trigger('TaskView', {task: this.model});
        }

    });

    return TaskView;

});