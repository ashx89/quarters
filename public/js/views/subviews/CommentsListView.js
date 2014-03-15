define([
    'backbone',
    'js/events/events',
    'js/views/subviews/CommentView'

], function(Backbone, Events, CommentView) {

    var CommentsListView = Backbone.View.extend({

        el: '#comments',

        initialize: function(collection, options) {
            this.$el.empty();
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
            var comment = new CommentView({ model: model });
            this.$el.append(comment.render().el);
            $('abbr.timeago').timeago();
        }

    });

    return CommentsListView;

});