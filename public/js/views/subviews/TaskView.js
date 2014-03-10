define([
    'backbone',
    'text!templates/task.html'

], function(Backbone, TaskTemplate) {

    var TaskView = Backbone.View.extend({

        events: {
            'click .checkbox-label': 'setTaskStatus',
            'click .icon-bin': 'deleteTask'
        },

        template: _.template(TaskTemplate),

        initialize: function() {
            this.model.on('change', this.render, this);
            _.bindAll(this,'setTaskStatus');
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        setTaskStatus: function() {
            var value = (this.model.get('completed') == false) ? true : false;
            this.model.set('completed', value);
            this.model.save();
        },

        deleteTask: function(e) {

            var id = $(e.target).data('id');
            this.model.destroy({success: function(res) { console.log(res) } })
        }

    });

    return TaskView;

});