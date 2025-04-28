const User = require('../Mongo/Schemas/User')
const Post = require('../Mongo/Schemas/Post')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const {
    USERNAME_TAKEN,
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_ERROR,
    LOGIN_SUCCESS,
    WRONG_PASSWORD,
    USER_DELETE_SUCCESS,
    USER_DELETE_NOT_FOUND,
    USER_DELETE_ERROR,
    USER_NOT_FOUND
} = require('../Utilities/Messages.js')
const { GetPostsByUser } = require('./PostService.js')

//TODO: ADD SERVER-SIDE USERNAME VALIDATION, NO-SQL INJECTION IS POSSIBLE
async function CreateUser(username, password){
    let UserObject = await IfUserExists_Username(username)
    if( UserObject.doesUserExist )
    {
        return{status: 409, message: USERNAME_TAKEN}
    }
    else
    {
        const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)
        try{
            let NewUser = await User({
                username: username,
                password: hashedPass
            })
        
            await NewUser.save()
            return {status: 200, message: REGISTRATION_SUCCESSFUL}
        }
        catch
        {
            return {status: 500, message: REGISTRATION_ERROR}
        }
    }
}

async function LoginUser(username, password)
{
    let UserObject = await IfUserExists_Username(username)
    if(UserObject.doesUserExist)
    {
        if(await bcrypt.compare(password, UserObject.targetUser[0].password))
        {
            
            return {status: 200, message: LOGIN_SUCCESS, UserId: UserObject.targetUser[0]._id.toString()}
        }
        else
        {
            return {status: 409, message: WRONG_PASSWORD}
        }
        
    }
    else
    {
        
        return {status: 404, message: USER_NOT_FOUND}
    }
}

async function DeleteUser(userID){
    let UserObject = await IfUserExists(userID)
    if(UserObject.doesUserExist)
    {
        try{
            let targetUserPostIds = (await GetPostsByUser(userID)).targetPost.map((post) => {return post._id})
            await Post.deleteMany({
                _id: {
                    $in: targetUserPostIds    
                }
            })
            .then((res) => {
                // console.log(res)
            })
            .catch((err) => {
                // console.log(err)
            })
            await User.findOneAndDelete({_id: userID})

            return {status: 200, message: USER_DELETE_SUCCESS}
        }
        catch(err)
        {
            return {status: 500, message: USER_DELETE_ERROR}
        }
    }
    else
    {
        return {status: 404, message: USER_DELETE_NOT_FOUND}
    }
   
}

async function IfUserExists(UserID){
    const targetUser = await User.findById({_id: UserID})
    if(targetUser?._id)
    {
        return {'doesUserExist': true, 'targetUser': targetUser}
    }
    else
    {
        return {'doesUserExist': false}
    }
}

async function IfUserExists_Username(Username){
    const targetUser = await User.find({username: Username})
    if(targetUser.length > 0)
    {
        return {'doesUserExist': true, 'targetUser': targetUser}
    }
    else
    {
        return {'doesUserExist': false}
    }
}



module.exports = {CreateUser, LoginUser, DeleteUser, IfUserExists, IfUserExists_Username}