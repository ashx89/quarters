define([
    'backbone',
    'js/events/events'

], function(Backbone, Events, TaskTemplate) {

    var TaskView = Backbone.View.extend({

        events: {
            'click .checkbox-label': 'setTaskStatus',
            'click .task-bin': 'deleteTask',
            'click .task-item-title': 'showTask'
        },

        template: _.template( $('#task-item-template').html() ),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
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
        },

        deleteTask: function(e) {
            var id = $(e.target).data('id');
            this.model.destroy({success: function(res) { console.log(res); Events.trigger('clearTaskView'); } })

        },

        showTask: function(e) {
            var target = $(e.target).parent().parent().parent(); // default div
            target.addClass('active-task').siblings().removeClass('active-task');
            Events.trigger('TaskView', {task: this.model});
        }

    });

    return TaskView;

});