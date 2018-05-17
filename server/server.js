const express = require('express');
const bodyParse = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./db/models/todo');
const {User} = require('./db/models/user');


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParse.json());


//Todos Api
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(201).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req ,res) => {
    Todo.find().exec().then(todos => {
        res.status(200).send(todos);
    }, err => {
        res.send(404).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const {id} = req.params
    const todo = Todo.findById(id).then(doc => {
        if(!doc) {
            return res.status(404).send({
                error: "Todo not found"
            });
        }
        res.status(200).send(doc);
    }).catch(e => {
        res.status(400).send({
            error: "Invalid ID"
        });
    });
    
});


app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(ObjectID.isValid(id)) {
        Todo.findByIdAndRemove(id).then(doc => {
            if(!doc) {
                return res.status(204).send();
            }
    
            res.status(200).send(doc);
        }).catch(e => res.status(204).send(e));
    }else {
        return res.status(400).send();
    }

})



//Users Api
app.post('/users', (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    user.save().then(doc => {
        res.status(201).send(doc);
    }, e => {
        res.status(400).send(e);
    }); 
})




app.listen(port, () => {
    console.log(`Connected on port ${port}`);
})

module.exports = {
    app
}