const express    = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _        = require('lodash');   // to manage ARGV


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
  console.log('GET id',id);
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
    res.status(404).send(`Searched ObjectID is not valid ${id}`);
  } else{
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }, (e) => {
      res.status(400).send(e);
    });
  }
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body.todo, ['text', 'completed']);
  console.log(`PATCH request received for id ${id} `, body);
  if(!ObjectID.isValid(id)){
    console.log(`Searched ObjectID is not valid ${id}`);
    return res.status(404).send(`Searched ObjectID is not valid ${id}`);
  } else {
    console.log('go on with PATCH');
  }
  if(_.isBoolean(body.completed) && body.completed){
    console.log('inside isBoolean');
    body.completedAt = new Date().getTime();
    //findOneAndUpdate
  } else {
    body.completed = false;
    body.completedAt = null;
  }
    
  Todo.findByIdAndUpdate( id, 
      { $set: body},
      {new: true}).then((todo) => {
        console.log('Eureka', todo);   

        if(!todo){
          return res.status(404).send();
        }
        res.send(todo);
      }).catch((e) => {
        console.log('PATCH status 400', e);
        res.status(400).send();
      });
 
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};