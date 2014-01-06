var Globals = Globals || {};
Globals.cachedViews = Globals.cachedViews || {};
Globals.cachedViews.page = Globals.cachedViews.page || {};

(function () {
  "use strict";

  Globals.Router = Backbone.Router.extend({

    initialize: function (options) {
      _.bindAll(this);
    },

    routes: {
      "program":    "programs",    // #programs
      "exercise":   "exercises",   // #exercises
      '*path':      "home"
    },

    home: function(args) {
      new Globals.page.Home().render();
    },

		programs: function(args) {
      new Globals.page.Program().render();
		},

    exercises: function(pageId){
      new Globals.page.Exercise().render();
    }
    });

}());
