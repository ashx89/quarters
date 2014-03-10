define([
    'backbone',
    'js/models/comment'

], function(Backbone, CommentModel) {

    var Comments = Backbone.Collection.extend({

        model: CommentModel,

        initialize: function(models, options) {
            this.taskid = options.id;
        },

        url: function() {
            return '/tasks/' + this.taskid + '/comments';
        }

    });

    return Comments;

});