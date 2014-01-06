var Globals    = Globals || {};
Globals.page   = Globals.page || {};

(function () {
  "use strict";

  var CREATE_SELECTOR       = "#create-item";
  var TITLE_SELECTOR        = CREATE_SELECTOR + " #title";
  var DESCRIPTION_SELECTOR  = CREATE_SELECTOR + " #description";
  var ADD_EXERCISE_SELECTOR = CREATE_SELECTOR + " #add-exercise";
  var EXERCISE_SELECTOR     = ADD_EXERCISE_SELECTOR + " #exercise";
  var LENGTH_SELECTOR       = ADD_EXERCISE_SELECTOR + " #length";
  var ORDER_SELECTOR        = ADD_EXERCISE_SELECTOR + " #order";

  var PROGRAM_EXERCISES_SELECTOR = CREATE_SELECTOR + " #program-exercises";
  var PROGRAM_EXERCISES_PROGRAM_SELECTOR = PROGRAM_EXERCISES_SELECTOR + " .program";

  Globals.page.Program = Globals.views.Base.extend({
    templateId: 'program-page-template',
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#main"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #create-item #create":             "createOnClick",
      "click #create-item #add-exercise #add":  "onAddExerciseClick"
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
      var view = new Globals.views.Program({model: new Globals.models.Program(program)});
      this.$("#item-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.$("#item-list").empty();
      Globals.Programs.each($.proxy(this, 'addOne'));
    },

    onAddExerciseClick: function(e) {
      var exercise_selected = this.$(EXERCISE_SELECTOR).find(":selected");
      var length_input = this.$(LENGTH_SELECTOR);
      var order_input = this.$(ORDER_SELECTOR);
      var exercise_id = exercise_selected.val();
      var length = length_input.val();
      var order = order_input.val();
      if (!exercise_id || !length || !order) return;
      var exerciseView = new Globals.views.ProgramExercise({model: new Globals.models.ProgramExercise({
        exercise: {
          id: exercise_id,
          title: exercise_selected.attr("data-title")
        },
        length: length,
        order: order
      })});
      this.$(PROGRAM_EXERCISES_SELECTOR).append(exerciseView.render().el);
      this.$(LENGTH_SELECTOR).val('');
      this.$(ORDER_SELECTOR).val('');
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnClick: function(e) {
      var title = this.$(TITLE_SELECTOR).val();
      var description = this.$(DESCRIPTION_SELECTOR).val();

      var exercises = [];
      this.$(PROGRAM_EXERCISES_PROGRAM_SELECTOR).each(function() {
        var program = $(this);
        exercises.push({
          exercise: program.find(".exercise_id").val(),
          length: program.find(".length").attr("data-value"),
          order: program.find(".order").attr("data-value")
        })
      });
      if (!title || !description || !exercises.length === 0) return;
      Globals.Programs.create({
        title: title,
        description: description,
        exercises: exercises
      });
      this.$(TITLE_SELECTOR).val('');
      this.$(DESCRIPTION_SELECTOR).val('');
      this.$(PROGRAM_EXERCISES_SELECTOR).empty();
    }
  });
}());