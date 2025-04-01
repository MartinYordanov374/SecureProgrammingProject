const mongoose = require('mongoose');

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