var application_root = __dirname,
    express = require("express"),
      path  = require("path"),
      lessMiddleware = require('less-middleware'),
  mongoose  = require('mongoose');
var pubDir = path.join(application_root, 'public');

var app = express();

// model
mongoose.connect('mongodb://localhost/exercise_app');

var Exercise = mongoose.model('Exercise', new mongoose.Schema({
  title: String,
  description: String,
  image_url: String
}));

var Program = mongoose.model('Program', new mongoose.Schema({
  exercise_id: String,
  length: Number,
  order: Number
}));

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(lessMiddleware({
      dest: '/css', // should be the URI to your css directory from the location bar in your browser
      src: '/less', // or '../less' if the less directory is outside of /public
      root: pubDir,
      compress: true
  }));
  app.use(express.static(pubDir));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('views', path.join(application_root, "views"));
  // app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  // app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
});

// root

app.get('/', function(req, res){
  res.render('index.html');
});


// exercise

// app.get('/exercise', function(req, res){
//   res.render('exercise', {title: "MongoDB Backed EXERCISE App"});
// });

app.get('/api/exercises', function(req, res){
  return Exercise.find(function(err, exercises) {
    return res.send(exercises);
  });
});

app.get('/api/exercises/:id', function(req, res){
  return Exercise.findById(req.params.id, function(err, exercise) {
    if (!err) {
      return res.send(exercise);
    }
  });
});

app.put('/api/exercises/:id', function(req, res){
  return Exercise.findById(req.params.id, function(err, exercise) {
    exercise.title        = req.body.title;
    exercise.description  = req.body.description;
    exercise.image_url    = req.body.image_url;
    return exercise.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(exercise);
    });
  });
});

app.post('/api/exercises', function(req, res){
  var exercise;
  exercise = new Exercise({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url
  });
  exercise.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(exercise);
});

app.delete('/api/exercises/:id', function(req, res){
  return Exercise.findById(req.params.id, function(err, exercise) {
    return exercise.remove(function(err) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });
});

// program

// app.get('/program', function(req, res){
//   res.render('program', {title: "MongoDB Backed Program App"});
// });

app.get('/api/programs', function(req, res){
  return Program.find(function(err, programs) {
    return res.send(programs);
  });
});

app.get('/api/programs/:id', function(req, res){
  return Program.findById(req.params.id, function(err, program) {
    program.exercise = Exercise.findById(program.exercise_id, function(err, exercise) {
      exercise.title        = req.body.title;
      exercise.description  = req.body.description;
      exercise.image_url    = req.body.image_url;
      if (!err) {
        return res.send(exercise);
      }
    });
    if (!err) {
      return res.send(program);
    }
  });
});

app.put('/api/programs/:id', function(req, res){
  return Program.findById(req.params.id, function(err, program) {
    program.exercise_id   = req.body.exercise_id;
    program.length        = req.body.length;
    program.order         = req.body.order;

    return program.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(program);
    });
  });
});

app.post('/api/programs', function(req, res){
  var program;
  program = new Program({
    exercise_id:  req.body.exercise_id,
    length:       req.body.length,
    order:        req.body.order
  });
  program.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(program);
});

app.delete('/api/programs/:id', function(req, res){
  return Program.findById(req.params.id, function(err, program) {
    return program.remove(function(err) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });
});

app.listen(3000);
console.log('express server listening on: 3000');
