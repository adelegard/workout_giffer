var Globals         = Globals || {};
Globals.collections = Globals.collections || {};

(function () {
    "use strict";

  Globals.collections.Exercise = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Globals.models.Exercise,

    // Save all of the todo items under the `"todos"` namespace.
    //localStorage: new Store("todos"),
    url: '/api/exercises'
  });
}());