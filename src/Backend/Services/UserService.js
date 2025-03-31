const User = require('../Mongo/Schemas/User')

async function CreateUser(username, password){
    console.log('creating user')
    let NewUser = await User({
        username: username,
        password: password
    })

    await NewUser.save()
}

async function DeleteUser(){
    console.log('deleting user')
}

async function IfUserExists(){
    console.log('checking if user exists')
}


module.exports = {CreateUser, DeleteUser, IfUserExists}