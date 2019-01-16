var express    = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {User}     = require('./models/user');

var app = express();

//now set up a dynamic port so that it will be the correct when pushing to Heroku
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  
  todo.save().then ((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/users', (req, res) => {
  console.log(req.body);
  var user = new User({
    Name: req.body.Name,
    email: req.body.email
  });

  user.save().then ((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
      res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;
  console.log('id',id);
  if(!ObjectID.isValid(id)){
    console.log(`Searched ObjectID is not valid ${id}`);
    res.status(400).send(`Searched ObjectID is not valid ${id}`);
  } else{
    Todo.findById(id).then((todo) => {
      res.send({todo});
    }, (e) => {
      res.status(400).send(e);
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;
  console.log('id to delete',id);
  if(!ObjectID.isValid(id)){
    console.log(`Searched ObjectID is not valid ${id}`);
    res.status(400).send(`Searched ObjectID is not valid ${id}`);
  } else{
    Todo.findByIdAndRemove(id).then((todo) => {
      res.send({todo});
    }, (e) => {
      res.status(400).send(e);
    });
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};