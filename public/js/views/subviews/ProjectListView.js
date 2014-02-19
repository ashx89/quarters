define([
    'backbone',
    'js/views/subviews/ProjectView'

], function(Backbone, ProjectView) {

    var ProjectListView = Backbone.View.extend({

        el: '#project-list',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
            this.collection.fetch();
        },

        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(model) {
            var project = new ProjectView({ model: model });
            this.$el.append(project.render().el);
        }

    });

    return ProjectListView;

});