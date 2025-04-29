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

// Create post function
async function CreatePost(content, parentPostId, ownerId){
    // find the parent of the post(may be non-existent)
    let postParent = await GetPostById(parentPostId)
    let newPost;
    try{
        // check if the post has a parent, if it does then the post is a comment, 
        // otherwise it is a regular comment
        if(postParent?.targetPost?.length > 0)
        {
            newPost = await Post({
                postOwner: ownerId,
                postBody: content,
                postParent: parentPostId
            })
            // add comment to the parent post's comment list
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
        console.log(err)
        return {status: 501, message: QUERY_ERROR}
    }
    
}


// delete post function
async function DeletePost(requestUserID, targetPostId){

    try{
        const result = await GetPostById(targetPostId)

        // check if the post's owner ID matches the requester's user ID
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


// like post function
async function LikePost(postId, likerId){
    try{
        // conver the likerObjectId to mongoose ObjectId
        const likerObjectId = new mongoose.Types.ObjectId(likerId);
        // Find the post with the specified ID and add the user's ID to the list of likes if it is not there already.
        // If it is, remove it from the list.
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
        return {status: 500, message: CHECK_LIKE_POST_LOGIC, err}
    }
}

// Get post by id function
async function GetPostById(postId){
    try
    {
        // find the specified post and populate the postOwner field with only the username
        // Also populate the comments field to return postOwner's username 
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

// Get posts by user function
async function GetPostsByUser(UserID){
    try
    {
        // Find the posts that are not comments and are created by the specified user.
        //Populate the postOwner field to reutrn username as well as the comment field to return the commenter's username
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

// Get all posts function
async function GetAllPosts()
{
    try
    {
        // Find all posts that are not comments with their post owner's username and comment owners' username.
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

module.exports = {CreatePost, DeletePost, LikePost, GetAllPosts, GetPostById, GetPostsByUser}