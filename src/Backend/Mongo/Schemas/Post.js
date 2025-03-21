const mongoose = require('mongoose');

const PostModel = new mongoose.Schema({
    postOwner:  {
       type: mongoose.Types.ObjectId,
       ref: 'user'
    },
    postBody: {
        type: String,
        required: true
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

module.exports = mongoose.model('post', PostModel)