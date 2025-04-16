const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')
const cors = require('cors');
const app = express()
const session = require('express-session')
const rateLimit = require('express-rate-limit')
const MongoStore = require('connect-mongodb-session')(session)

const {
    USER_NOT_REGISTERED, 
    USER_REGISTERED,
    PASSWORD_CRITERIA_NOT_MET,
    NOT_AUTHORIZED,
    INTERNAL_SERVER_ERROR,
    RATE_LIMIT_MESSAGE
} = require('../Utilities/Messages.js')

let MongoSessionStore = new MongoStore({
    uri: 'mongodb://localhost:27017/testmongodb',
    collection: 'userSessions'
})

const AuthRateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 20,
    message: {message: RATE_LIMIT_MESSAGE}
})

const PostRateLimiter = rateLimit({
    windowMs: 2*60*1000,
    max: 100,
    message: {message: RATE_LIMIT_MESSAGE}
})
const APP_PORT = 5001

const {CreateUser, LoginUser, DeleteUser} = require('../Services/UserService.js')
const { CreatePost, DeletePost, LikePost, GetAllPosts, GetPostById, GetPostsByUser } = require('../Services/PostService.js')

const PASSWORD_REGEX = /^(?=.*\w)(?=.*[A-Z]){1,}(?=.*\W).{8,}$/


app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000'],
    credentials: true
}))

app.use(session({
    store: MongoSessionStore,
    cookie: {
        maxAge: 3600*60*24*7,
        path: '/',
        httpOnly: true
    },
    saveUninitialized: false,
    secret: 'This should not be here',
}))

app.post('/user/login', AuthRateLimiter, async (req,res)  => {
    try{
        let username = req.body.username
        let password = req.body.password
    
        if(!PASSWORD_REGEX.test(password))
        {
            res.status(403).send({message: PASSWORD_CRITERIA_NOT_MET})
        }
        else
        {
            let result = await LoginUser(username, password)
            if(result.status == 200)
            {
                const userID = result.UserId
                req.session.userID = userID
                req.session.save(()=>{});
            }
            res.status(result.status).send({message: result.message})
        }
    }
    catch(err)
    {
        console.log('RATE LIMITED OR SOMETHING')
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
    
})

app.post('/user/register', AuthRateLimiter, async (req,res) => {
    try
    {
        let username = req.body.username
        let password = req.body.password.trim()
        if(!PASSWORD_REGEX.test(password))
        {
            res.status(403).send({message:PASSWORD_CRITERIA_NOT_MET})
        }
        else
        {
            let result = await CreateUser(username, password)
    
            res.status(result.status).send({message: result.message})
        }
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
    
})

app.delete('/user/delete/:userID', async (req,res) => {
    try{
        let userID = req.params.userID
        if(userID != req.session.userID)
        {
            res.status(409).send({message: NOT_AUTHORIZED})
        }
        else
        {
            let result = await DeleteUser(userID)
            if(result.status==200)
            {
                req.session.destroy(() => {
               
                    res.status(200).send('Deleted profile and logged out')
                })
            }
            else
            {
                res.status(result.status).send({message: result.message})
            }
        }
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
   
    
})

app.get('/user/isRegistered', async(req,res)=>{
    try{
        if(req.session.userID){
            res.status(200).send({'isRegistered': true, message: USER_REGISTERED})
        }
        else
        {
            res.status(401).send({'isRegistered': false, message: USER_NOT_REGISTERED})
        }
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})

    }
})

app.get('/user/get/currentUser', async(req,res) => {
    try{
        if(req.session.userID)
            {
                res.status(200).send({'userID': req.session.userID, 'message': 'Retrieved user'})
            }
            else
            {
                res.status(401).send({'message': 'User not found'})
            }
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }

})

app.post('/user/logout', async(req,res) => {
    try
    {
        req.session.destroy(() => {
       
            res.status(200).send('logged out')
          })
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})

    }
    

})

app.post('/post/create', PostRateLimiter, async(req,res) => {
    try{
        const postOwnerId = req.session.userID;
        const postContent = req.body.content;
        const postParentId = req.body.parentId;
        let result = await CreatePost(postContent, postParentId, postOwnerId)
        res.status(result.status).send({'message':result.message})
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
  
})
//TODO: Dockerize application once ready
app.delete('/post/delete/:postId', PostRateLimiter, async(req,res) => {
    try{
        const currentUserId = req.session.userID;
        const postId = req.params.postId;
        let result = await DeletePost(currentUserId, postId)
        res.status(result.status).send({'message':result.message})
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
    
})

app.post("/post/like/:postId", PostRateLimiter, async(req,res) => {
    try
    {
        let postId = req.params.postId;
        let userId = req.session.userID
        let result = await LikePost(postId, userId);
        res.status(result.status).send({'message':result.message})
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
})

app.get("/post/getAll", PostRateLimiter, async(req,res) => {
    try{
        let result = await GetAllPosts();
        res.status(result.status).send({'message':result.message, 'posts': result.allPostsList})
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
   
})

app.get("/post/fetch/:postId", PostRateLimiter, async(req,res) => {
    try{
        let result = await GetPostById(req.params.postId)
        res.status(result.status).send({'message':result.message, 'post': result.targetPost})
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
   
})

app.get("/post/fetch/owner/:userID", PostRateLimiter, async(req,res) => {
    try{
        let result = await GetPostsByUser(req.params.userID)
        res.status(result.status).send({'message':result.message, 'post': result.targetPost})
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
    
})

app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})