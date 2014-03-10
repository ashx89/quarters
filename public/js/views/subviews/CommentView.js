define([
    'backbone',
    'js/events/events'

], function(Backbone, Events) {

    var CommentView = Backbone.View.extend({

        events: {
            'click .comment-bin': 'deleteComment'
        },

        template: _.template($('#task-comments-template').html()),

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        deleteComment: function(e) {
            this.model.destroy({success: function(res) { console.log(res); } })
        }

    });

    return CommentView;

});