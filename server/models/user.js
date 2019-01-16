const mongoose = require('mongoose');
const validator = require('validator');

// {
//   email: '',
//   password: '',
//   tokens: [{
//     access: 'auth',
//     token: ''
//   }]
// }

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
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minLength: 6
    },
    tokens: [{
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }],
    created: {
      type: Date,
      default: Date.now
    }
  });
  var User = mongoose.model('UserMongoose', UserSchema);


module.exports = {User};