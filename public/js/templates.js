(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['exercise-item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"exercise\">\n	<div class=\"display\">\n		<div class=\"title\">Title: ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " </div>\n		<div class=\"description\">Description: ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n		<div class=\"image_url\">Image: ";
  if (helper = helpers.image_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n		<input id=\"destroy\" type=\"Button\" value=\"Delete\">\n	</div>\n</div>";
  return buffer;
  });
templates['exercise-page'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"page\">\n	<div class=\"title\">\n		<h1>Exercises</h1>\n	</div>\n	<div class=\"content\">\n		<div id=\"create-exercise\">\n			<input id=\"title\" placeholder=\"Exercise title?\" type=\"text\">\n			<input id=\"description\" placeholder=\"Exercise description?\" type=\"text\">\n			<input id=\"image_url\" placeholder=\"Exercise image url?\" type=\"text\">\n			<input id=\"create\" type=\"button\" value=\"Create\">\n		</div>\n		<div id=\"exercises\">\n			<ul id=\"exercise-list\"></ul>\n		</div>\n	</div>\n</div>";
  });
templates['home-page'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"page\">\n	<div class=\"title\">\n		<h1>Workout App! Woot.</h1>\n		<a href=\"#exercise\">Exercise Page</a>\n		<br>\n		<a href=\"#program\">Program Page</a>\n	</div>\n</div>";
  });
templates['program-item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"program\">\n	<div class=\"display\">\n		<div>Title: ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n		<div>Length: ";
  if (helper = helpers.length) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.length); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n		<input id=\"destroy\" type=\"Button\" value=\"Delete\">\n	</div>\n</div>";
  return buffer;
  });
templates['program-page'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"page\">\n	<div class=\"title\">\n		<h1>Programs</h1>\n	</div>\n	<div class=\"content\">\n		<div id=\"create-program\">\n			<input id=\"length\" placeholder=\"Program length?\" type=\"text\">\n			<input id=\"order\" placeholder=\"Exercise order?\" type=\"text\">\n			<input id=\"create\" type=\"button\" value=\"Create\">\n		</div>\n		<div id=\"programs\">\n			<ul id=\"program-list\"></ul>\n		</div>\n	</div>\n</div>";
  });
})();