const {MongoClient, ObjectID} = require('mongodb');   //this line equal the above

var obj = new ObjectID();  //this is creating new ObjectID

console.log(obj, `Created on ${obj.getTimestamp()}`);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp');

    //deleteMnay
    db.collection('Users').deleteMany({
        name: 'Marco',
        age: 57,
        location: 'BB'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user');
        }
        console.log(result);
    });

    //deleteOne
    db.collection('Users').deleteOne({
        name: 'Ivan',
        age: 57,
        location: 'BB'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user');
        }
        console.log(result);
    });

    //findAndDelete
    db.collection('Users').findOneAndDelete({
        name: 'Matteo',
        age: 57,
        location: 'BB'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user');
        }
        console.log(result);
    });

    //findAndDelete
    db.collection('Todos').deleteMany({"completed" : true}, (err, result) => {
        if(err){
            return console.log('Unable to insert user');
        }
        console.log(result);
    });


client.close();
});