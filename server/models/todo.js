var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
      minLength: 1,
      trim: true      //eliminate blanks before and trailings
    },
    completed: {
      type: Boolean,
      required: false,
      default: false
    },
    completedAt: {
      type: Number,
      required: false,
      default: null
    },
    created: {
      type: Date,
      default: Date.now
    }
  });
  var Todo = mongoose.model('TodoMongoose', ToDoSchema);

module.exports = {Todo};