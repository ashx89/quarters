define([
    'backbone',
    'js/events/events',
    'js/views/subviews/TaskView'

], function(Backbone, Events, TaskView) {

    var TasksListView = Backbone.View.extend({

        el: '.tasks-body ul',

        initialize: function(collection, options) {            
            this.collection.on('add', this.addOne, this);
            this.collection.on('remove', this.render, this);
            this.collection.fetch();
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

    return TasksListView;

});