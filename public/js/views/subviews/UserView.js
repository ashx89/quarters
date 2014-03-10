define([
    'backbone',
    'text!templates/user.html',
    'js/events/events'

], function(Backbone, UserTemplate, Events) {

    var UserView = Backbone.View.extend({

        template: _.template(UserTemplate),

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return UserView;

});