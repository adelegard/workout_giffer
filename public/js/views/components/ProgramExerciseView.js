var Globals     = Globals || {};
Globals.views   = Globals.views || {};

(function () {
    "use strict";

  Globals.views.ProgramExercise = Globals.views.Base.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    templateId: 'program-exercise-item-template',

    // The DOM events specific to an item.
    events: {
      "click #destroy"             : "remove"
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

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    }

  });
}());