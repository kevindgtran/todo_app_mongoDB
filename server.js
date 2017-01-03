var express = require('express');
var app = express();
app.use(express.static('public'));
// app.use(express.static('vendor'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app-demo');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//require the model we just created in todo.js file
var Todo = require('./models/todo');

var vacuum = new Todo({
  task: "clean the rug",
  description: "use vacuum to clean the rug"
});

vacuum.save(function(err, newTodo){
  if(err) {return console.log(err);}
  console.log("saved new todo: ", newTodo);
});

//ROUTES
// get all todos
app.get('/api/todos', function todosIndex(req, res) {
  // find all todos in db
  Todo.find(function handleDBTodosListed(err, allTodos) {
    res.json({ todos: allTodos });
  });
});

// get one todo
app.get('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id
  Todo.findOne({ _id: todoId }, function (err, foundTodo) {
    res.json(foundTodo);
  });
});

// create new todo
app.post('/api/todos', function todosCreate(req, res) {
  // create new todo with form data (`req.body`)
  var newTodo = new Todo(req.body);

  // save new todo in db
  newTodo.save(function handleDBTodoSaved(err, savedTodo) {
    res.json(savedTodo);
  });
});

// update todo
app.put('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id
  Todo.findOne({ _id: todoId }, function (err, foundTodo) {
    // update the todos's attributes
    foundTodo.task = req.body.task;
    foundTodo.description = req.body.description;

    // save updated todo in db
    foundTodo.save(function (err, savedTodo) {
      res.json(savedTodo);
    });
  });
});

// delete todo
app.delete('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id and remove
  Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
    res.json(deletedTodo);
  });
});








app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
