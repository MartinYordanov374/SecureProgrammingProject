const Post = require('../Mongo/Schemas/Post')
const mongoose = require('mongoose')

async function CreatePost(content, parentPostId, ownerId){
    let postParent = await GetPostById(parentPostId)
    let newPost;
    try{
        if(postParent.targetPost.length > 0)
        {
            newPost = await Post({
                postOwner: ownerId,
                postBody: content,
                postParent: parentPostId
            })
            await Post.findByIdAndUpdate(
                postParent.targetPost[0]._id, 
                { $push: { comments: newPost._id } }, 
                { new: true } 
            );
        }
        else
        {
            newPost = await Post({
                postOwner: ownerId,
                postBody: content
            })
        }
        await newPost.save()
        return {status: 200, message: 'Post created successfully.'}
    }
    catch(err)
    {
        return {status: 501, message: 'Something went wrong with the query. Check your parameter data types as well as the query itself.'}
    }
    
}

async function DeletePost(requestUserID, targetPostId){

    try{
        const result = await GetPostById(targetPostId)
        if(result.targetPost[0]?.postOwner.toString() == requestUserID)
        {
            let res = await Post.findByIdAndDelete({_id: targetPostId})
            return {status: 200, message: 'Post deleted successfully.'}
        }
        else
        {
            return {status: 401, message: 'You are not authorized to execute this action.'}
        }
        
       
    }
    catch(err)
    {
        return {status: 500, message: 'Something went wrong. Check the delete post method logic.', err}
    }

}

async function LikePost(postId, likerId){
    try{
        const likerObjectId = new mongoose.Types.ObjectId(likerId);
        await Post.findOneAndUpdate(
            { _id: postId },
            [{
                $set:{
                    likes:{
                        $cond: {
                            if: { $in: [likerObjectId, "$likes"] },
                            then: { $setDifference: ["$likes", [likerObjectId]] },
                            else: { $concatArrays: ["$likes", [likerObjectId]] }
                        }
                    }
                }
            }],
            { new: true }
        );
        return {status: 200, message: 'Post liked successfully.'}
    }
    catch(err)
    {
        console.log(err)
        return {status: 500, message: 'Something went wrong. Check the like post method logic.', err}
    }
}

async function SharePost(){
    return {status: 501, message: 'Share post method is not implemented yet.'}
}

async function GetPostById(postId){
    try
    {
        let targetPost = await Post.find({_id: postId})
        return {status: 200, message: 'Post successfully fetched.', targetPost}
    }
    catch(err)
    {
        return {status: 500, message: 'Something went wrong, it is likely that a post with such ID does not exist. Check again.', err}
    }
}

module.exports = {CreatePost, DeletePost, LikePost, SharePost}