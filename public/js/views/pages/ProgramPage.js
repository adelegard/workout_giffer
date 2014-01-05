var Globals    = Globals || {};
Globals.page   = Globals.page || {};

(function () {
  "use strict";

  var CREATE_SELECTOR     = "#create-program";
  var EXERCISE_SELECTOR   = CREATE_SELECTOR + " #exercise";
  var LENGTH_SELECTOR     = CREATE_SELECTOR + " #length";
  var ORDER_SELECTOR      = CREATE_SELECTOR + " #order";

  Globals.page.Program = Globals.views.Base.extend({
    templateId: 'program-page-template',
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#main"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #create-program #create":  "createOnClick"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      Globals.Exercises = Globals.Exercises || new Globals.collections.Exercise();
      Globals.Programs  = Globals.Programs || new Globals.collections.Program();

      Globals.Programs.bind('add',   this.addOne, this);
      Globals.Programs.bind('reset', this.render, this);
      Globals.Programs.bind('all',   this.addAll, this);

      Globals.Exercises.bind('reset', this.render, this);
      Globals.Exercises.bind('all',   this.render, this);

      Globals.Exercises.fetch();
      Globals.Programs.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      // var exercises = Globals.Exercises.map(function(exercise) {
      //   return {
      //     title: exercise.getTitle(),
      //     description: exercise.getDescription(),
      //     id: exercise.getId()
      //   }
      // });

      this.renderTemplate({
        exercises: Globals.Exercises.toJSON()
      });
      // this.addAll();
      return this;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(program) {
      var view = new Globals.views.Program({model: program});
      this.$("#program-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.$("#program-list").empty();
      Globals.Programs.each($.proxy(this, 'addOne'));
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnClick: function(e) {
      var exercise_select = this.$(EXERCISE_SELECTOR);
      var length_input = this.$(LENGTH_SELECTOR);
      var order_input = this.$(ORDER_SELECTOR);
      var exercise_id = exercise_select.val();
      var length = length_input.val();
      var order = order_input.val();
      if (!exercise_id || !length || !order) return;
      Globals.Programs.create({
        exercise_id: exercise_id,
        length: length,
        order: order
      });
      length_input.val('');
      order_input.val('');
    }
  });
}());