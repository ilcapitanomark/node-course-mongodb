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