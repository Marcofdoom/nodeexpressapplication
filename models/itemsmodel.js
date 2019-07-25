const mongoose = require("mongoose");

// SCHEMAS
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// User MODEL
let user = mongoose.model('User', userSchema);

module.exports = user;