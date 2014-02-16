define([
    'backbone',
    'js/views/task',
    'js/events/events'

], function(Backbone, TaskView, Events) {

    var TasksView = Backbone.View.extend({

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(model) {
            var project = new TaskView({ model: model });
            this.$el.append(project.render().el);
        }

    });

    return TasksView;

});