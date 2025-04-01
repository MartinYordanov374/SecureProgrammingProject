const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')

const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

let MongoSessionStore = new MongoStore({
    uri: 'mongodb://localhost:27017/testmongodb',
    collection: 'userSessions'
})

const APP_PORT = 5001

const {CreateUser, LoginUser, DeleteUser} = require('../Services/UserService.js')
const { CreatePost } = require('../Services/PostService.js')


//TODO: Implement express session and mongo session storage
app.use(express.json())

app.use(session({
    store: MongoSessionStore,
    cookie: {
        maxAge: 3600*60*24*7
    },
    secret: 'This should not be here'
}))

app.post('/user/login', async (req,res)  => {
    console.log('logging in')
    let username = req.body.username
    let password = req.body.password
    let result = await LoginUser(username, password)
    console.log(result.status)
    if(result.status == 200)
    {
        req.session.save(() => {

        })
    }
    res.status(result.status).send({message: result.message})
})

app.post('/user/register', async (req,res) => {
    let username = req.body.username
    let password = req.body.password
    let result = await CreateUser(username, password)

    res.status(result.status).send({message: result.message})
})

app.delete('/user/delete/:username', async (req,res) => {
    let username = req.params.username
    let result = await DeleteUser(username)

    res.status(result.status).send({message: result.message})
})

app.post('/post/create', async(req,res) => {
    const postOwnerId = req.body.ownerID; //TODO: Get this from the session
    const postContent = req.body.content;
    const postParentId = req.body.parentId;
    let result = await CreatePost(postContent, postParentId, postOwnerId)
})

app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})