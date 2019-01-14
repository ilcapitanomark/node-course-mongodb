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