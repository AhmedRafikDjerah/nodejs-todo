const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('../server');
const {Todo} = require('../db/models/todo');
const {User} = require('../db/models/user');

const todos = [
    {
        _id: new ObjectID(),
        text: "Seeding number one"
    },
    {   
        _id: new ObjectID(),
        text: "Seeding number two"
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());

    User.remove({}).then(() => done());
});


describe('POST /todos', () => {
    it("Should create a new Todo", (done) => {
        const text = "This is a test text";
    
        request(app)
            .post('/todos')
            .send({text})
            .expect(201)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
    
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch(e => done(e));
                
            });
    });

    it("Should not create a new todo", (done) => {
       
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return doen(err)
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(err => done(err));
            });
    });
    
});


describe('GET /todos', () => {
    it("Should get all the todos", (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(2);
            })
            .end(done);
    });

    it("Should return onde Todo", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(new ObjectID(res.body._id)).toEqual(todos[0]._id);
            })
            .end(done);
    });

    it("Shoud return 404 todo not found", (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect(res => {
                expect(res.body.error).toBe("Todo not found");
            })
            .end(done);
    });

    it("Shoud return 404 bad request", (done) => {
        request(app)
            .get('/todos/123456')
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe("Invalid ID");
            })
            .end(done);
    });
});


describe("POST /users", () => {
    it("Should create a new user", (done) => {
        const firstname = "test";
        const lastname = "test";

        request(app)
            .post('/users')
            .send({firstname, lastname})
            .expect(201)
            .expect((res) => {
                expect(res.body.firstname).toBe(firstname);
                expect(res.body.lastname).toBe(lastname);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.find().then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].firstname).toBe(firstname);
                    expect(users[0].lastname).toBe(lastname);
                    done();
                }).catch(e => done(e));


            });
    });

    it("Should not create a new user", (done) => {
        request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.find().then(users => {
                    expect(users.length).toBe(0);
                    done();
                }).catch(e => done(e));
            });
    });
});
