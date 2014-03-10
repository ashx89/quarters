define([
    'backbone',
    'js/models/user'

], function(Backbone, UserModel) {

    var Users = Backbone.Collection.extend({

        model: UserModel,

        initialize: function(models, options) {
            this.projectid = options.id;
        },

        url: function() {
            return '/project/' + this.projectid + '/users';
        }

    });

    return Users;

});