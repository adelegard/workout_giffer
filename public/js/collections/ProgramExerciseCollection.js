var Globals         = Globals || {};
Globals.collections = Globals.collections || {};

(function () {
    "use strict";

  Globals.collections.ProgramExercise = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Globals.models.ProgramExercise,

    // Save all of the todo items under the `"todos"` namespace.
    //localStorage: new Store("todos"),
    url: '/api/program-exercises'
  });
}());