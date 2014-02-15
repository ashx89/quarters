define([
    'backbone',
    'js/events/events',
    'js/router'

], function(Backbone, Events, Router) {

    var App = function() {
        new Router();
        Backbone.history.start({ pushState: true, root: '/' });
    };

    return App;

});