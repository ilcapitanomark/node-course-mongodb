var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

  mongoose.connect('mongodb://localhost:27017/TodoAppMongoose', options).then(
  (res) =>{
    console.log('opened', res);
  },
  (err) => {
    console.log(err);
  });  

/*
We have a pending connection to the test database running on localhost. 
We now need to get notified if we connect successfully or if a connection error occurs:
*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

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

  var Todo = mongoose.model('TodoMongoose', ToDoSchema);
  var User = mongoose.model('UserMongoose', UserSchema);

var newTodo = new Todo({
    text: 'Prepara la cena',
    completedAt: 123
});
console.log(newTodo.text); // 'Cook dinner'


newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('Unable to save todo');
});

var newTodo = new Todo({
  text: 'Aiuta Solange',
  completed: false
});

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});

//mongoose.disconnect();

// User
//email required trimmed
var newUser = new User({
  Name: 'Solange',
  email: 'sp@gmail.com'
});
console.log(newUser.Name); // 'Cook dinner'

newUser.save().then((doc) => {
  console.log('Saved user', doc);
}, (e) => {
  console.log('Unable to save user', e);
});
