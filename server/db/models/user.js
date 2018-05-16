const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
        trim: true,
        minLength: 1,
        maxLength: 25,

    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        trim: true,
        minLength: 1,
        maxLength: 25,

    }

});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}

