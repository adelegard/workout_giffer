var Globals    = Globals || {};
Globals.page   = Globals.page || {};
Globals.Exercises = Globals.Exercises || new Globals.collections.Exercise();
Globals.Programs  = Globals.Programs || new Globals.collections.Program;

(function () {
  "use strict";

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
      this.select_exercise    = this.$("#create-program #exercise");
      this.input_length       = this.$("#create-program #length");
      this.input_order        = this.$("#create-program #order");

      Globals.Programs.bind('add',   this.addOne, this);
      Globals.Programs.bind('reset', this.render, this);
      Globals.Programs.bind('all',   this.render, this);

      Globals.Exercises.bind('add',   this.addOne, this);
      Globals.Exercises.bind('reset', this.render, this);
      Globals.Exercises.bind('all',   this.render, this);

      Globals.Exercises.fetch();
      Globals.Programs.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      // this.$('#todo-stats').html(this.statsTemplate({
      //   total:      Globals.Exercises.length,
      //   done:       Globals.Exercises.done().length,
      //   remaining:  Globals.Exercises.remaining().length
      // }));
      this.renderTemplate({
        exercises: [{blah: "sup"}]
      });
      this.addAll();
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
      Globals.Programs.each($.proxy(this, 'addOne'));
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnClick: function(e) {
      var exercise_id = this.select_exercise.val();
      var length = this.input_length.val();
      var input_order = this.input_order.val();
      if (!exercise_id || !length || !input_order) return;
      Globals.Programs.create({
        exercise_id: exercise_id,
        length: length,
        order: order
      });
      this.input_length.val('');
      this.input_order.val('');
    }
  });
}());