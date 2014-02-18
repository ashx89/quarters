define([
    'backbone',
    'js/events/events',
    'text!templates/tasks.html',
    'js/collections/tasks',
    'js/views/tasks'

], function(Backbone, Events, TasksContainerTemplate, TasksCollection, TasksView) {

    var TasksContainerView = Backbone.View.extend({

        el: '#tasks',

        template: _.template( TasksContainerTemplate ),

        events: {
            /* Add new task events
            ------------------------------------------------ */
            'click #add-new-task': 'showModal',
            'click [data-modal="new-task"] .modal-overlay': 'closeModal',
            'click #btn-task-new': 'newTask'

        },

        initialize: function(model, options) {
           // this.collection.on('reset', this.renderList, this);

            this.collection = new TasksCollection([], {id: options.pid});
            this.collection.fetch();

            console.log(this.collection.projectid)

            _.bindAll(this, 'showModal', 'closeModal', 'newTask');

            this.model          = options.model.attributes; // an object of the project tasks belongs to

            this.tasksContainer = $('#tasks-container');
            this.modalContainer = $('#tasks-modal-container');
        },

        /* -----------------------------------------------------------------
         * Render the Tasks
         * ----------------------------------------------------------------- */
         render: function() {
            this.tasksContainer.html( this.template(this.model) );
            this.renderList();
            return this;
         },

         renderList: function() {
            new TasksView({collection: this.collection, el: '.tasks-body ul'}).render()
         },

         /* -----------------------------------------------------------------
         * New Task methods
         * ----------------------------------------------------------------- */
         showModal: function(e) {
            e.preventDefault();

            this.modalTemplate = _.template($('#task-modal-template').html(), this.model);
            this.modalContainer.html(this.modalTemplate);

            console.log(this.collection.projectid)

         },

         closeModal: function() {
            $('[data-modal="new-task"]').remove();
         },

         newTask: function(e) {
            e.preventDefault();

            var task = {
                id: new Date().getTime().toString(),
                title: document.getElementById('input-task-title').value,
                projectid: this.collection.projectid.toString()
            };

            this.collection.create(task, {wait: true});
            this.closeModal();
         }


    });

    return TasksContainerView;

});