define([
    'backbone',
    'js/models/task'

], function(Backbone, TaskModel) {

    var Tasks = Backbone.Collection.extend({

        model: TaskModel,

        initialize: function(models, options) {
            this.projectid = options.id;
        },

        url: function() {
            return '/project/' + this.projectid + '/tasks';
        }

    });

    return Tasks;

});