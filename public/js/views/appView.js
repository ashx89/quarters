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

            /* Add new task events
            ------------------------------------------------ */
        },

        initialize: function() {
            _.bindAll(this, 'openModal', 'closeModal', 'addProject');
        },

        /* -----------------------------------------------------------------
         * Add New Project Methods
         * ----------------------------------------------------------------- */

        setModal: function(modal) {
            this.modal = $('[data-modal="new-'+modal+'"]');
            this.modal.removeClass('hidden');
        },

        openModal: function(e) {
            e.preventDefault();
            var target = $(e.target).data('target');
            this.setModal(target);
        },

        closeModal: function() {
            this.modal.addClass('hidden')
        },


        /* Add new project
        ------------------------------------------------ */
        addProject: function(e) {
            e.preventDefault();

            var project = {
                id: new Date().getTime().toString(),
                title: document.getElementById('input-project-title').value
            };

            this.collection.create(project, {wait: true});
            this.modal.addClass('hidden')
        }

    });

    return AppView;

});