var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
      minLength: 1,
      trim: true      //eliminate blanks before and trailings
    },
    email: {
      type: String,
      required: true,
      minLength: 1,
      trim: true
    },
    created: {
      type: Date,
      default: Date.now
    }
  });
  var User = mongoose.model('UserMongoose', UserSchema);


module.exports = {User};