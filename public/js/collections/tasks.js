define([
    'backbone',
    'js/models/task'

], function(Backbone, TaskModel) {

    var Tasks = Backbone.Collection.extend({

        model: TaskModel,

        initialize: function(models, options) {
            this.taskid = options.id;
        },

        url: function() {
            return '/project/' + this.taskid + '/tasks';
        }

    });

    return Tasks;

});