const mongoose = require('mongoose');

// Define the user schema and model from the schema
// Note that references are being set, analogical to foreign-key relations between tables in relational databases
const UserSchema = new mongoose.Schema({
    username:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

const User = mongoose.model('user', UserSchema)

module.exports = User