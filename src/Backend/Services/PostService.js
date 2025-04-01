const Post = require('../Mongo/Schemas/Post')

async function CreatePost(content, parentPostId, ownerId){
    try{
        const newPost = await Post({
            postOwner: ownerId,
            postBody: content,
            postParent: parentPostId
        })
    
        await newPost.save()
        return {status: 200, message: 'Post created successfully.'}
    }
    catch(err)
    {
        return {status: 501, message: 'Something went wrong with the query. Check your parameter data types as well as the query itself.'}
    }
    
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

async function GetPostById(id){
    return {status: 501, message: 'Share post method is not implemented yet.'}

}

module.exports = {CreatePost, DeletePost, LikePost, SharePost}