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
            $('#task-header').html( this.taskHeader(this.task.toJSON()) ).removeClass('hidden');
            $('#task-body').html( this.taskBody(this.task.toJSON()) ).removeClass('hidden');
            $('#task-footer').removeClass('hidden');

            this.collection = new Comments([], {id: this.task.id});
            new CommentsListView({ collection: this.collection });
        },

        updateTask: function(task) {
            var status = task.attributes.completed;
            (status) ? this.$el.addClass('completed-' + status) : this.$el.removeClass('completed-' + !status);
        },

        clearView: function() {
            $('#task-header').empty().addClass('hidden');
            $('#task-body').empty().addClass('hidden');
            $('#task-footer').addClass('hidden');
            $('#comments').empty();
        },

        newComment: function(e) {
            e.preventDefault();

            var comment = {
                id:     new Date().getTime().toString(),
                text:   $('#comment').val(),
                taskId: this.task.id
            };

            this.collection.create(comment, {wait: true});
            this.collection.fetch();
            $('#comment').val('');
        }

    });

    return TaskView;

});