var Globals         = Globals || {};
Globals.collections = Globals.collections || {};

(function () {
    "use strict";

  Globals.collections.Program = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Globals.models.Program,

    // Save all of the todo items under the `"todos"` namespace.
    //localStorage: new Store("todos"),
    url: '/api/programs',

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });
}());