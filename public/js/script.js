var Globals = Globals || {};

// An example Backbone application contributed by
// [JÃ©rÃ´me Gravel-Niquet](http://jgn.me/).


// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Finally, we kick things off by creating the **App**.
  // window.App = new Globals.ExerciseAppView;
  this.router = new Globals.Router();
  Backbone.history.start();

});