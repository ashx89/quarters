define([
    'backbone',
    'js/events/events',
    'js/collections/comments',
    'js/views/subviews/CommentsListView'

], function(Backbone, Events, Comments, CommentsListView) {

    var TaskView = Backbone.View.extend({

        el: '#task',

        events: {
            /* Add new task events
            ------------------------------------------------ */
            'submit': 'newComment'
        },

        initialize: function(options) {
            _.bindAll(this, 'newComment');
            
            Events.on('updateTask', this.updateTask, this);
            Events.on('clearTaskView', this.clearView, this);

            this.taskHeader   = _.template($('#task-header-template').html());
            this.taskBody     = _.template($('#task-body-template').html());
            this.taskComments = _.template($('#task-comments-template').html());
        },

        render: function(options) {
            this.task = options.task;
            $('#task-header').html( this.taskHeader(this.task.toJSON()) );
            $('#task-body').html( this.taskBody(this.task.toJSON()) );

            this.collection = new Comments([], {id: this.task.id});
            new CommentsListView({ collection: this.collection });
        },

        updateTask: function(task) {
            var status = task.attributes.completed;
            (status) ? this.$el.addClass('completed-' + status) : this.$el.removeClass('completed-' + !status);
        },

        clearView: function() {
            $('#task-header').empty();
            $('#task-body').empty();
            $('#comments').empty();
        },

        newComment: function(e) {
            e.preventDefault();

            var comment = {
                taskId: this.task.id,
                id: new Date().getTime().toString(),
                text: $('#comment').val()
            };

            this.collection.create(comment, {wait: true});
            $('#comment').val('');
        }

    });

    return TaskView;

});