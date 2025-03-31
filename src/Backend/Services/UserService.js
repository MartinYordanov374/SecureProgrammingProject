const User = require('../Mongo/Schemas/User')

async function CreateUser(username, password){
    console.log('creating user')
    let UserExists = await IfUserExists(username)
    if( UserExists )
    {
        return{status: 409, message: 'This username is already taken.'}
    }
    else
    {
        try{
            let NewUser = await User({
                username: username,
                password: password
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

}

async function DeleteUser(){
    console.log('deleting user')
}

async function IfUserExists(username){
    const targetUser = await User.find({username: username})
    if(targetUser.length > 0)
    {
        return true
    }
    else
    {
        return false
    }
}


module.exports = {CreateUser, LoginUser, DeleteUser, IfUserExists}