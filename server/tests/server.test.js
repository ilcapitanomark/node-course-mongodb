const expect = require('expect');
const request = require('supertest');

const {app}  = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos = [
    { text: '1st test todo'},
    { text: '2nd test todo'}
];

var newObjectID = '5c3e083b860793fcffba58e4';

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) =>{
        var text = '1st test todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err); 
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create todo with invalid data', (done) => {
        var text = '';
        //cleanup the db from the previous insertion
        Todo.deleteMany({}).then(() => {
            done();
        });
        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    //done();
                }).catch((e) => {
                    done(e);
                });
            });

    });
 });

 describe('GET ALL /todos', () => {
    
    it('should get all todos', (done) =>{
        var text = '1st test todo';

        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(2)
              })    
            .end((err, response) => {
                if (err) {
                    return done(err);
                }
                //console.log(response.body);
                //newObjectID = response.body.todos[0]._id;
                //console.log('newObjectID', newObjectID);
                Todo.find().then((todos) => {
                    expect(response.body.todos.length).toBe(2);
                    expect(response.body.todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
 });

 describe('GET /todos:id' , () => {
    it('should GET /todos:id', (done) =>{
        var id = '/todos/';
        Todo.find().then((todos) => {
            id = '/todos/' +  todos[0]._id;
            console.log('found id 3', id);
            var text = '1st test todo';
            
            request(app)
                .get(id)
                .expect(200)
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }
                    expect(response.body.todo.text).toBe(text);
                    done();
                });
        }).catch((e) => {
            console.log(e);
        });
    });
});