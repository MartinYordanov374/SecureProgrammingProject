const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')
const cors = require('cors');

const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

let MongoSessionStore = new MongoStore({
    uri: 'mongodb://localhost:27017/testmongodb',
    collection: 'userSessions'
})

const APP_PORT = 5001

const {CreateUser, LoginUser, DeleteUser} = require('../Services/UserService.js')
const { CreatePost, DeletePost, LikePost } = require('../Services/PostService.js')


app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))

app.use(session({
    store: MongoSessionStore,
    cookie: {
        maxAge: 3600*60*24*7,
        path: '/',
        httpOnly: true
    },
    secret: 'This should not be here',
}))

app.post('/user/login', async (req,res)  => {
    let username = req.body.username
    let password = req.body.password
    let result = await LoginUser(username, password)
    if(result.status == 200)
    {
        const userID = result.UserId
        req.session.userID = userID
        req.session.save(()=>{});
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
    const postOwnerId = req.session.userID;
    const postContent = req.body.content;
    const postParentId = req.body.parentId;
    let result = await CreatePost(postContent, postParentId, postOwnerId)
    res.status(result.status).send({'message':result.message})
})

app.delete('/post/delete/:postId', async(req,res) => {
    const currentUserId = req.session.userID;
    const postId = req.params.postId;
    let result = await DeletePost(currentUserId, postId)
    res.status(result.status).send({'message':result.message})
})

app.post("/post/like/:postId", async(req,res) => {
    let postId = req.params.postId;
    let userId = req.session.userID
    let result = await LikePost(postId, userId);
    res.status(result.status).send({'message':result.message})
})
app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})