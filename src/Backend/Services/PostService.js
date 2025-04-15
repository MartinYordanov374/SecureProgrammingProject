const Post = require('../Mongo/Schemas/Post')
const mongoose = require('mongoose')
const {
POST_CREATED_SUCCESSFULLY,
QUERY_ERROR,
POST_DELETED_SUCCESSFULLY,
NOT_AUTHORIZED,
POST_LIKE_SUCCESS,
CHECK_LIKE_POST_LOGIC,
NOT_IMPLEMENTED_MESSAGE,
POST_FETCHED_SUCCESS,
POST_FETCH_ERROR
} = require('../Utilities/Messages.js')
async function CreatePost(content, parentPostId, ownerId){
    let postParent = await GetPostById(parentPostId)
    let newPost;
    try{
        if(postParent?.targetPost?.length > 0)
        {
            newPost = await Post({
                postOwner: ownerId,
                postBody: content,
                postParent: parentPostId
            })
            await Post.findByIdAndUpdate(
                postParent?.targetPost[0]._id, 
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
        return {status: 200, message: POST_CREATED_SUCCESSFULLY}
    }
    catch(err)
    {
        return {status: 501, message: QUERY_ERROR}
    }
    
}

async function DeletePost(requestUserID, targetPostId){

    try{
        const result = await GetPostById(targetPostId)
        if(result.targetPost[0]?.postOwner._id.toString() == requestUserID)
        {
            let res = await Post.findByIdAndDelete({_id: targetPostId})
            return {status: 200, message: POST_DELETED_SUCCESSFULLY}
        }
        else
        {
            return {status: 401, message: NOT_AUTHORIZED}
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
        return {status: 200, message: POST_LIKE_SUCCESS}
    }
    catch(err)
    {
        console.log(err)
        return {status: 500, message: CHECK_LIKE_POST_LOGIC, err}
    }
}

async function SharePost(){
    return {status: 501, message: NOT_IMPLEMENTED_MESSAGE}
}

async function GetPostById(postId){
    try
    {
        let targetPost = await Post.find({_id: postId})
        .populate('postOwner', 'username')
        .populate({path:'comments', 
            populate: {
                path: 'postOwner',
                select: 'username'
            }})
        return {status: 200, message: POST_FETCHED_SUCCESS, targetPost}
    }
    catch(err)
    {
        return {status: 500, message: POST_FETCH_ERROR, err}
    }
}

async function GetPostsByUser(UserID){
    try
    {
        let targetPost = await Post.find({postOwner: UserID, postParent: { $exists: false }})
        .populate('postOwner', 'username')
        .populate({path:'comments', 
            populate: {
                path: 'postOwner',
                select: 'username'
            }})
        return {status: 200, message: POST_FETCHED_SUCCESS, targetPost}
    }
    catch(err)
    {
        return {status: 500, message: POST_FETCH_ERROR, err}
    }
}

async function GetAllPosts()
{
    try
    {
        let allPostsList = await Post.find({
            postParent: { $exists: false }
        })
        .populate('postOwner', 'username')
        .populate({path: 'comments',
            populate: {
              path: 'postOwner',
              select: 'username'
            }})
       
        return {status: 200, message: POST_FETCHED_SUCCESS, allPostsList}
    }
    catch(err)
    {
        return {status: 500, message: POST_FETCH_ERROR, err}
    }
}

module.exports = {CreatePost, DeletePost, LikePost, SharePost, GetAllPosts, GetPostById, GetPostsByUser}