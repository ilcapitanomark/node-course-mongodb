//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   //this line equal the above

/*
var obj = new ObjectID();
console.log(obj, `Created on ${obj.getTimestamp()}`);

var user = {name: 'Marco', age: 57};
var {name} = user;   //this tecnique is called ES6 Destructuring
console.log(name);
*/ 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to Mongodb Server');

    const db = client.db('TodoApp');

  

    //db.getCollection('Todos').find({});
    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Now fetching Todos BY COMPLETED');
        console.log(JSON.stringify(docs, undefined,2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

   db.collection('Todos').find({
        _id: new ObjectID('5c34cba1965e799544814d15')
    }).toArray().then((docs) => {
        console.log('Now fetching Todos by ObjectID');
        console.log(JSON.stringify(docs, undefined,2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Now fetching Todos count ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos count', err);
    });

    db.collection('Users').find().count().then((count) => {
        console.log(`Now fetching Users count ${count}`);
    }, (err) => {
        console.log('Unable to fetch Users count', err);
    });

        db.collection('Users').find({name: { $ne: "Matteo"} }).toArray().then((docs) => {
            console.log('Now fetching Users BY Matteo');
            console.log(JSON.stringify(docs, undefined,2));
        }, (err) => {
            console.log('Unable to fetch Users that are not Matteo', err);
        });
        
    //client.close();
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