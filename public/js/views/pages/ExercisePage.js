var Globals     = Globals || {};
Globals.page   = Globals.page || {};

(function () {
  "use strict";

  var CREATE_SELECTOR       = "#create-item";
  var TITLE_SELECTOR        = CREATE_SELECTOR + " #title";
  var DESCRIPTION_SELECTOR  = CREATE_SELECTOR + " #description";
  var IMAGE_URL_SELECTOR    = CREATE_SELECTOR + " #image_url";

  Globals.page.Exercise = Globals.views.Base.extend({
    templateId: 'exercise-page-template',
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#main"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #create-item #create":  "createOnClick"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      _.bindAll(this);
      this.exerciseCollection = Globals.collectionManager.addCollection({
        id: "exercise",
        type: Globals.collections.Exercise,
        fetch: true
      });
      this.exerciseCollection.unbind('add').bind('add',   this.addOne, this);
      this.exerciseCollection.unbind('reset').bind('reset', this.render, this);
      this.exerciseCollection.unbind('all').bind('all',   this.render, this);
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      this.renderTemplate({});
      this.addAll();
      return this;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(exercise) {
      var view = new Globals.views.Exercise({model: exercise});
      this.$("#item-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      console.log("add all");
      var self = this;
      this.exerciseCollection.each($.proxy(self, 'addOne'));
    },

    getTitle: function() {
      return this.$(TITLE_SELECTOR);
    },

    getDescription: function() {
      return this.$(DESCRIPTION_SELECTOR);
    },

    getImageUrl: function() {
      return this.$(IMAGE_URL_SELECTOR);
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnClick: function(e) {
      var self = this;
      console.log("creating!!");
      var title = self.getTitle().val();
      var description = self.getDescription().val();
      var image_url = self.getImageUrl().val();
      if (!title || !description || !image_url) return;
      self.exerciseCollection.create({
        title: title,
        description: description,
        image_url: image_url
      });
      self.getTitle().val('');
      this.getDescription().val('');
      this.getImageUrl().val('');
    }
  });
}());