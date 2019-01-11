const {MongoClient, ObjectID} = require('mongodb');   //this line equal the above

var obj = new ObjectID();  //this is creating new ObjectID

console.log(obj, `Created on ${obj.getTimestamp()}`);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp');

    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate(
            { text: "Call Lorenzo"}, 
            { $set: {"completed" : true}},
            { returnOriginal: true},
            ( err, result) => {
        if(err){
            return console.log('Unable to update Todos');
        }
        console.log(result);
    });

        //findOneAndUpdate
        db.collection('Users').findOneAndUpdate(
            { name: "Solange"}, 
            { $set: {"age" : 13}},
            { returnOriginal: true},
            ( err, result) => {
        if(err){
            return console.log('Unable to update Todos');
        }
        console.log(result);
    });

            //findOneAndUpdate
            // as filter I could use the objectId like this:
            // {"_id" : ObjectId("5c35f7e4652ae2c275946a65")}
            db.collection('Users').findOneAndUpdate(
                { name: "Francesco"}, 
                { $inc: {"age" : +1}},
                { returnOriginal: false},
                ( err, result) => {
            if(err){
                return console.log('Unable to update Todos');
            }
            console.log(result);
        });

client.close();
});