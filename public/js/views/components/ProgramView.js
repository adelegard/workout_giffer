var Globals     = Globals || {};
Globals.views   = Globals.views || {};

(function () {
    "use strict";

  Globals.views.Program = Globals.views.Base.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    templateId: 'program-item-template',

    // The DOM events specific to an item.
    events: {
      "click #destroy"             : "clear"
    },

    // The TodoView listens for changes to its model, re-rendering.
    initialize: function(options) {
      this.model = options.model;
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the todo item.
    render: function() {
      this.renderTemplate(this.model.toJSON());
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      // this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({text: this.input.val()});
      $(this.el).removeClass("editing");
    },

    create: function(e) {
      this.close();
    },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });
}());