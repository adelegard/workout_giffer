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
  title: String,
  description: String,
  exercises: [{type: mongoose.Schema.ObjectId, ref: 'ProgramExercise'}]
}));
var ProgramExercise = mongoose.model('ProgramExercise', new mongoose.Schema({
  exercise: {type: mongoose.Schema.ObjectId, ref: 'Exercise'},
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
  app.engine('html', require('ejs').renderFile);
});

// root

app.get('/', function(req, res){
  res.render('index.html');
});


// exercise

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
        console.log("updated: " + JSON.stringify(exercise));
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
      console.log("created: " + JSON.stringify(exercise));
    }
  });
  return res.send(exercise);
});

app.delete('/api/exercises/:id', function(req, res){
  return Exercise.findById(req.params.id, function(err, exercise) {
    return exercise.remove(function(err) {
      if (!err) {
        console.log("removed: " + JSON.stringify(exercise));
        return res.send('')
      }
    });
  });
});

// program

app.get('/api/programs', function(req, res){
  return Program.find().populate("exercises").exec(function(err, programs) {
    console.log("found programs: " + JSON.stringify(programs));
    return res.send(programs);
  });
});

app.get('/api/programs/:id', function(req, res){
  return Program.findById(req.params.id).populate("exercises").exec(function(err, program) {
    console.log("found program: " + JSON.stringify(program));
    if (!err) {
      return res.send(program);
    }
  });
});

app.put('/api/programs/:id', function(req, res){
  console.log("put program: " + JSON.stringify(req.body));
  return Program.findById(req.params.id, function(err, program) {
    program.title         = req.body.title;
    program.description   = req.body.description;
    program.exercises     = req.body.exercises;

    return program.save(function(err) {
      if (!err) {
        console.log("updated: " + JSON.stringify(program));
      }
      return res.send(program);
    });
  });
});

app.post('/api/programs', function(req, res){
  console.log("post program: " + JSON.stringify(req.body));
  var program = new Program({
    title:        req.body.title,
    description:  req.body.description,
    exercises:    req.body.exercises
  });
  program.save(function(err) {
    if (!err) {
      return console.log("created: " + JSON.stringify(program));
    }
  });
  return res.send(program);
});

app.delete('/api/programs/:id', function(req, res){
  return Program.findById(req.params.id, function(err, program) {
    return program.remove(function(err) {
      if (!err) {
        console.log("removed: " + JSON.stringify(program));
        return res.send('')
      }
    });
  });
});

// program-exercise

app.get('/api/program-exercises', function(req, res){
  return ProgramExercise.find().populate("exercise").exec(function(err, program_exercises) {
    return res.send(program_exercises);
  });
});

app.get('/api/program-exercises/:id', function(req, res){
  return ProgramExercise.findById(req.params.id).populate("exercise").exec(function(err, program_exercises) {
    if (!err) {
      return res.send(program_exercises);
    }
  });
});

app.put('/api/program-exercises/:id', function(req, res){
  return ProgramExercise.findById(req.params.id, function(err, program_exercise) {
    program_exercise.exercise        = req.body.exercise;
    program_exercise.length  = req.body.length;
    program_exercise.order    = req.body.order;
    return program_exercise.save(function(err) {
      if (!err) {
        console.log("updated: " + JSON.stringify(program_exercise));
      }
      return res.send(program_exercise);
    });
  });
});

app.post('/api/program-exercises', function(req, res){
  var program_exercise = new ProgramExercise({
    exercise: req.body.exercise,
    length:   req.body.length,
    order:    req.body.order
  });
  program_exercise.save(function(err) {
    if (!err) {
      console.log("created: " + JSON.stringify(program_exercise));
    }
  });
  return res.send(program_exercise);
});

app.delete('/api/program-exercises/:id', function(req, res){
  return ProgramExercise.findById(req.params.id, function(err, program_exercise) {
    return program_exercise.remove(function(err) {
      if (!err) {
        console.log("removed: " + JSON.stringify(program_exercise));
        return res.send('')
      }
    });
  });
});

app.listen(3000);
console.log('express server listening on: 3000');
