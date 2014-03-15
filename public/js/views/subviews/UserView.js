define([
    'backbone',
    'js/events/events'

], function(Backbone, Events) {

    var UserView = Backbone.View.extend({

        template: _.template( $('#user-item-template').html() ),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return UserView;

});