const mongoose = require('mongoose');

// Define the post schema and model from the schema
// Note that references are being set, analogical to foreign-key relations between tables in relational databases
const PostModel = new mongoose.Schema({
    postOwner:  {
       type: mongoose.Types.ObjectId,
       ref: 'user',
       required: true
    },
    postBody: {
        type: String,
        required: true
    },
    postParent: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: false
    },
    likes:[{
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }],
    comments:[{
            type: mongoose.Types.ObjectId,
            ref: 'post'
        }]
})

const post = mongoose.model('post', PostModel)

module.exports = post