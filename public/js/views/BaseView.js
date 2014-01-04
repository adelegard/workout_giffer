var Globals     = Globals || {};
Globals.views   = Globals.views || {};

(function () {
    "use strict";

    Globals.views.Base = Backbone.View.extend({
        available: true,

        constructor: function() {
            Backbone.View.apply(this, arguments);
        },

		/**
		 * Call this right before rendering to handle events and clear
		 * out any content.
		 */
		reset: function() {
			this.delegateEvents();
			if (this.el) {
				$(this.el).empty();
			}
			if (this.onReset) {
				this.onReset();
			}
			return this;
		},

		/**
		 * Called in a render method
		 * to render the template.
		 */
		renderTemplate: function(templateArgs, options) {
			var root = this;

			templateArgs = templateArgs || {};

			// Reset the HTML and Events.
			root.reset();

			// Get the compiled template.
			// If it doesn't exist yet, create it.
			// The template can be created
			// Get the template id.
			// This can be a function.
			var templateId = root.templateId;
			if (options && options.templateId) {
				// If the template id has been
				// passed in, use that.
				templateId = options.templateId;
			}
			if (typeof(templateId) == "function") {
				templateId = root.templateId();
			}
			root.compiledTemplate = root.getCompliledTemplate(templateId);

			$(root.el).html(root.compiledTemplate(templateArgs));
			return root.compiledTemplate(templateArgs);
		},

		getCompliledTemplate: function(templateId) {
			if (!Globals.compiledTemplates) {
				Globals.compiledTemplates = {};
			}
			if (!Globals.compiledTemplates[templateId]) {
				// Log an error message if no template is found.
				var template = $("#" + templateId);
				if (template.size() <= 0) {
					throw new Error("Template '" + templateId + "' not found.");
				}

				// Get the template source.
				Globals.compiledTemplates[templateId] = Handlebars.compile(template.html());
			}
			return Globals.compiledTemplates[templateId];
		}
    });
}());
