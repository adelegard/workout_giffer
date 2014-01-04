var Globals     = Globals || {};
Globals.models  = Globals.models || {};

(function () {
    "use strict";

  Globals.models.Program = Backbone.Model.extend({
    idAttribute: "_id",

    // Default attributes for a exercise item
    defaults: function() {
      return {
        order: Globals.collections.Exercise.nextOrder(),
        length: 30
      };
    }
  });
}());