const Post = require('../Mongo/Schemas/Post')

async function CreatePost(content, parentPostId, ownerId){
    // TODO: Check if the post has a parent, if it does it is a comment

    return {status: 501, message: 'Create post method is not implemented yet.'}
}

async function DeletePost(){
    return {status: 501, message: 'Delete post method is not implemented yet.'}

}

async function LikePost(){
    return {status: 501, message: 'Like post method is not implemented yet.'}

}

async function SharePost(){
    return {status: 501, message: 'Share post method is not implemented yet.'}

}

module.exports = {CreatePost, DeletePost, LikePost, SharePost}