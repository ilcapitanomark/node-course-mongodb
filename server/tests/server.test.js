const expect = require('expect');
const request = require('supertest');

const {app}  = require('./../server.js');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) =>{
        var text = 'Test todo text';

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
                    expect(todos.length).toBe(1);
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

describe('GET /todos', () => {
    
    it('should get all todos', (done) =>{
        var text = 'Test todo text';
        request(app)
        .post('/todos')
        .send({text})
        .end((err, response) => {
            if(err){
                return done(err);
            }
            //console.log(response.body);
        });
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(1)
              })    
            .end((err, response) => {
                if (err) {
                    return done(err);
                }
                //console.log(response.body);
                Todo.find().then((todos) => {
                    expect(response.body.todos.length).toBe(1);
                    //expect(response.body.todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});