const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Text is required"],
        validate: {
            validator: function(v) {
                return v.length > 5;
            },
            message: "Text should be greater than 5"
        },
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    }
})

const Todo = mongoose.model('todo', todoSchema);

module.exports = {
    Todo
};