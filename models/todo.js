//create schema
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task: String,
  description: String
});

var Todo = mongoose.model('Todo', TodoSchema); //a model schema is a schema that has been "activted" for CRUDind

//export it, so it can be required in other parts of the app
module.exports = Todo;
