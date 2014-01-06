var Globals     = Globals || {};
Globals.models  = Globals.models || {};

(function () {
    "use strict";

  Globals.models.ProgramExercise = Backbone.Model.extend({
    idAttribute: "_id"

    // initialize: function(options) {
      // Globals.Programs = Globals.Programs || new Globals.collections.Program();
    // },

    // Default attributes for a exercise item
    // defaults: function() {
      // return {
      //   order: Globals.Programs.nextOrder(),
      //   length: 30
      // };
    // }
  });
}());