define([
    'backbone',
    'js/events/events',
    'js/views/subviews/TaskView'

], function(Backbone, Events, TaskView) {

    var TasksListView = Backbone.View.extend({

        el: '.tasks-body ul',

        initialize: function() {            
            
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.render);
            this.collection.fetch();
        },

        render: function() {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(model) {
            var task = new TaskView({ model: model });
            this.$el.append(task.render().el);
        }

    });

    return TasksListView;

});