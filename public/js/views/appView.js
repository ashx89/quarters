define([
    'backbone',
    'js/views/ProjectView'

], function(Backbone, ProjectView) {

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {

            this.projectView = new ProjectView();

            this.subviews.push(this.projectView);
        },

        render: function() {},

        subRender: function() {

            this.projectView.render().el;

        }

    });

    return AppView;

});