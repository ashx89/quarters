define([
    'backbone',
    'js/models/project',
    'js/events/events'

], function(Backbone, ProjectModel, Events) {

    var NewProjectView = Backbone.View.extend({

        el: 'body',

        events: {
            'click #add-new-project': 'openModal',
            'click .modal-overlay':   'closeModal',
            'click #btn-project-new': 'addProject'
        },

        initialize: function() {
            this.modal = $('[data-modal="new-project"]');
            _.bindAll(this, 'openModal', 'closeModal', 'addProject');
        },

        openModal: function(e) {
            e.preventDefault();
            this.modal.removeClass('hidden');
        },

        closeModal: function() {
            this.modal.addClass('hidden')
        },

        addProject: function(e) {
            e.preventDefault();

            var projectModel = new ProjectModel();

            var project = {
                title: document.getElementById('input-project-title').value
            };

            projectModel.save(project, {
                wait: true,
                success: function(response) {
                    console.log(response);
                },
                error: function(model, response) {
                    //var obj = $.parseJSON(response.responseText);
                    console.log(model, response);
                }
            });

            this.modal.addClass('hidden')
        }

    });

    return NewProjectView;

});