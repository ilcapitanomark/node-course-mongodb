const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo}     = require('../server/models/todo');
const {User}     = require('../server/models/user');

var id = '5c3eeb051fa609c5d1c796e5';

if(!ObjectID.isValid(id)){
    console.log('ObjectID not valid');    
} else {

    Todo.findByIdAndRemove({
        _id: id
    }).then(
        (result) => {
            if (!result) {
                console.log('todo id not found');
            }
            console.log('Todo removed', result);
        }).catch((err) => {
            console.log(err);
        }
    )
}
