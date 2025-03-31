const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')

const app = express()
const APP_PORT = 5001

const {CreateUser, IfUserExists} = require('../Services/UserService.js')

app.use(express.json())

app.post('/login', async (req,res)  => {
    console.log('logging in')
})

app.post('/register', async (req,res) => {
    let username = req.body.username
    let password = req.body.password

    await CreateUser(username, password).then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

    res.status(200).send({username, password})
})

app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})