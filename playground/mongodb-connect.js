//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   //this line equal the above

var obj = new ObjectID();  //this is creating new ObjectID

console.log(obj, `Created on ${obj.getTimestamp()}`);

var user = {name: 'Marco', age: 57};
var {name} = user;   //this tecnique is called ES6 Destructuring
console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to Mongodb Server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined,2));
    // });

    db.collection('Users').insertOne({
        name: 'Marco',
        age: 57,
        location: 'BB'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user');
        }

        var ObjectId_TimeStamp = result.ops[0]._id.getTimestamp();
        console.log(JSON.stringify(result.ops, undefined,2));
        console.log(result.ops, `Created on ${ObjectId_TimeStamp}`);
    });

    client.close();
});

/*
Mongodb _id specs
http://mongodb.github.io/node-mongodb-native/2.0/tutorials/objectid/
Size	Description
4 bytes	a 4-byte value representing the seconds since the Unix epoch
3 bytes	a 3-byte machine identifier
2 bytes	2-byte process id
3 bytes	3-byte counter, starting with a random value
*/