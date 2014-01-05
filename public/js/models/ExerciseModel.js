var Globals     = Globals || {};
Globals.models  = Globals.models || {};

(function () {
    "use strict";

    var TITLE = "title";
    var DESCRIPTION = "description";
    var ID = "_id";

  Globals.models.Exercise = Backbone.Model.extend({
    idAttribute: "_id",

    // Default attributes for a exercise item
    // defaults: function() {
    //   return {
    //     order: Globals.collections.Exercise.nextOrder(),
    //     length: 30
    //   };
    // }
    getTitle: function() {
        this.get(TITLE);
    },

    getDescription: function() {
        this.get(DESCRIPTION);
    },

    getId: function() {
        this.get(ID);
    }
  });
}());