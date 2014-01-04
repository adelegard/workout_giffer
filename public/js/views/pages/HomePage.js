var Globals    = Globals || {};
Globals.page   = Globals.page || {};

(function () {
  "use strict";

  Globals.page.Home = Globals.views.Base.extend({
    templateId: 'home-page-template',
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#main"),

    render: function() {
    	var self = this;
    	self.renderTemplate({});
    	return self;
    }
  });
}());