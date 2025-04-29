const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')
const cors = require('cors');
const app = express()
const session = require('express-session')
const rateLimit = require('express-rate-limit')
const MongoStore = require('connect-mongodb-session')(session)
const sanitize = require('mongo-sanitize')

const {loadEnvFile} = require('process')
loadEnvFile('../../../.env')

const {
    USER_NOT_REGISTERED, 
    USER_REGISTERED,
    PASSWORD_CRITERIA_NOT_MET,
    NOT_AUTHORIZED,
    INTERNAL_SERVER_ERROR,
    RATE_LIMIT_MESSAGE
} = require('../Utilities/Messages.js')

// configure the active user session storage
let MongoSessionStore = new MongoStore({
    uri: `${process.env.MONGOOSE_CONNECTION_STRING}`,
    collection: 'userSessions'
})

// configure rate limiters that are used as middlewares in the endpoints below
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

const RegularRateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 1000,
    message: {message: RATE_LIMIT_MESSAGE}
})

const APP_PORT = process.env.SERVER_PORT

const {CreateUser, LoginUser, DeleteUser} = require('../Services/UserService.js')
const { CreatePost, DeletePost, LikePost, GetAllPosts, GetPostById, GetPostsByUser } = require('../Services/PostService.js')


// set up the regex for password validation
const PASSWORD_REGEX = /^(?=.*\w)(?=.*[A-Z]){1,}(?=.*\W).{8,}$/

app.use(express.json())

//set up cors
app.use(cors({
    origin: [process.env.ORIGIN, process.env.REMOTE_ORIGIN],
    credentials: true
}))

// configure the server-side session and session cookies
app.use(session({
    store: MongoSessionStore,
    cookie: {
        maxAge: 3600*60*24*7,
        path: '/',
        httpOnly: true,
        sameSite: true
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}))

// login endpoint
app.post('/user/login', AuthRateLimiter, async (req,res)  => {
    try{
        // sanitize body, preventing injection attacks
        let sanitized_body = sanitize(req.body)
        let username = sanitized_body.username
        let password = sanitized_body.password
        // Check if the username and password are string. 
        // If an injection payload has been inserted, they will be of type object
        if(typeof username == 'string' && typeof password == 'string')
        {
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
                            // save the user ID in the session object
                            req.session.userID = userID
                            req.session.save(()=>{});
                        }
                        res.status(result.status).send({message: result.message})
                }
        }
        else
        {
            res.status(500).send({'message': 'Try using a different username or password'})
        }
    }
    catch(err)
    {
        console.log(err)
        console.log('RATE LIMITED OR SOMETHING')
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
    
})
// register user endpoint
app.post('/user/register', AuthRateLimiter, async (req,res) => {
    try
    {
        // sanitize body against injection attacks
        let sanitized_body = sanitize(req.body)
        let username = sanitized_body.username
        let password = sanitized_body.password
         // Check if the username and password are string. 
        // If an injection payload has been inserted, they will be of type object
        if(typeof username == 'string' && typeof password == 'string')
        {
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
        else
        {
            res.status(500).send({'message':'Try using a different username or password'})
        }
       
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
    
})

// Delete user endpoint
app.delete('/user/delete/:userID', RegularRateLimiter, async (req,res) => {
    try{
        let userID = req.params.userID
        // check if the user requesting the delete is the same as the one being deleted
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

// check if user is registered
app.get('/user/isRegistered', RegularRateLimiter, async(req,res)=>{
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

// Get the current user ID endpoint
app.get('/user/get/currentUser', RegularRateLimiter, async(req,res) => {
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

//logout endpoint
app.post('/user/logout', RegularRateLimiter, async(req,res) => {
    try
    {
        // destroy the current user session
        req.session.destroy(() => {
       
            res.status(200).send('logged out')
          })
    }
    catch(err)
    {
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})

    }
    

})

// create post endpoint
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
        console.log(err)
        res.status(500).send({'message': INTERNAL_SERVER_ERROR, err})
    }
  
})

// delete post endpoint
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

// like post endpoint
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

// get all posts endpoint
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

// fetch a specific post endpoint
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

// fetch a specific user's posts
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