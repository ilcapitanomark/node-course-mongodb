const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

var id = '5c3dde21416e2fde1f15d89a';
//var id = '5c3dde21416e2fde1f15d89a'; //correct value id

if(!ObjectID.isValid(id)){
    console.log('ObjectID not valid');    
} else {
    Todo.findById({
        _id: id
    }).then((todo) => {
        if (!todo) {
            console.log('todo id not found');
        }
        console.log('Todo', todo);
    }).catch((err) => {
        console.log(err);
    });

    Todo.find({
        _id: id
    }).then((todos) => {
        console.log(todos);
    });
}

Todo.findOne().then((todo) => {
     console.log(todo);
 });

//test users object
 var id = '5c3c623dbdfea27aef1594e3';

 if(!ObjectID.isValid(id)){
    console.log('ObjectID not valid');    
} else {
    User.findById({
        _id: id
    }).then((user) => {
        if (!user) {
            console.log('user id not found');
        }
        console.log('User', user);
    }).catch((err) => {
        console.log(err);
    });

    User.find({
        _id: id
    }).then((users) => {
        console.log(users);
    });
}