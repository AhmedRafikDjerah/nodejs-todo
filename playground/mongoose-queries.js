const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/db/models/todo');

const id = "5afc385f58d2ac1208655854";


    Todo.findOne({
        _id: id
    }, ('text')).then(todo => {
        if(!todo) {
            return console.log('Todo not found');
        }
        console.log(todo);
    }).catch(e => console.log('fucking error '));
