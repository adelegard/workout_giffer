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
      "program":                 "programs",    // #programs
      "exercise":                 "exercises",    // #exercises
      "search/:query":        "search",  // #search/kiwis
      "search/:query/p:page": "search",   // #search/kiwis/p7
      '*path':  'home'
    },

    home: function(args) {
      if (Globals.cachedViews.page.Home) {
        Globals.cachedViews.page.Home.render();
        return;
      }
      Globals.cachedViews.page.Home = new Globals.page.Home().render();
    },

		programs: function(args) {
      if (Globals.cachedViews.page.Program) {
        Globals.cachedViews.page.Program.render();
        return;
      }
      Globals.cachedViews.page.Program = new Globals.page.Program();
		},

    exercises: function(pageId){
      if (Globals.cachedViews.page.Exercise) {
        Globals.cachedViews.page.Exercise.render();
        return;
      }
      Globals.cachedViews.page.Exercise = new Globals.page.Exercise();
    }
    });

}());
