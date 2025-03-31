const User = require('../Mongo/Schemas/User')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

async function CreateUser(username, password){
    let UserObject = await IfUserExists(username)
    if( UserObject.doesUserExist )
    {
        return{status: 409, message: 'This username is already taken.'}
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
            return {status: 200, message: 'User successfully registered'}
        }
        catch
        {
            return {status: 500, message: 'Internal server error: Something went wrong with the fetching. Check database connection.'}
        }
       
        
    }
}

async function LoginUser(username, password)
{
    let UserObject = await IfUserExists(username)
    if(UserObject.doesUserExist)
    {
        //TODO: Check if entered password matches the user password in the db
        if(await bcrypt.compare(password, UserObject.targetUser[0].password))
        {
            return {status: 200, message: 'Login successful.'}
        }
        else
        {
            return {status: 409, message: 'Wrong password.'}
        }
        
    }
    else
    {
        
        return {status: 404, message: 'A user with such a username does not exist in our database.'}
    }
}

async function DeleteUser(){
    return {status: 501, message: 'Deleting user is not implemented yet.'}
}

async function IfUserExists(username){
    const targetUser = await User.find({username: username})
    if(targetUser.length > 0)
    {
        return {'doesUserExist': true, 'targetUser': targetUser}
    }
    else
    {
        return {'doesUserExist': false}
    }
}



module.exports = {CreateUser, LoginUser, DeleteUser, IfUserExists}