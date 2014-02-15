define([
    'backbone',
    'js/models/project',
    'js/events/events'

], function(Backbone, ProjectModel, Events) {

    var AppView = Backbone.View.extend({

        el: 'body',

        events: {
            /* Add new project events
            ------------------------------------------------ */
            'click #add-new-project': 'openModal',
            'click .modal-overlay':   'closeModal',
            'click #btn-project-new': 'addProject'
        },

        initialize: function() {
            this.modal = $('[data-modal="new-project"]');
            _.bindAll(this, 'openModal', 'closeModal', 'addProject');
        },


        /* -----------------------------------------------------------------
         * Add New Project Methods
         * ----------------------------------------------------------------- */

        openModal: function(e) {
            e.preventDefault();
            this.modal.removeClass('hidden');
        },

        closeModal: function() {
            this.modal.addClass('hidden')
        },

        addProject: function(e) {
            e.preventDefault();

            var project = {
                title: document.getElementById('input-project-title').value
            };

            this.collection.create(project, {wait: true});

            this.modal.addClass('hidden')
        }

    });

    return AppView;

});