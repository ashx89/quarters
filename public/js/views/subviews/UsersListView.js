define([
    'backbone',
    'js/events/events',
    'js/views/subviews/UserView'

], function(Backbone, Events, UserView) {

    var UsersListView = Backbone.View.extend({

        el: '#user-list',

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
            var user = new UserView({ model: model });
            this.$el.append(user.render().el);
        }

    });

    return UsersListView;

});