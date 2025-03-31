const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')

const app = express()
const APP_PORT = 5001

const {CreateUser, LoginUser, DeleteUser} = require('../Services/UserService.js')

app.use(express.json())

app.post('/login', async (req,res)  => {
    console.log('logging in')
    let username = req.body.username
    let password = req.body.password
    let result = await LoginUser(username, password)
    res.status(result.status).send({message: result.message})
})

app.post('/register', async (req,res) => {
    let username = req.body.username
    let password = req.body.password
    let result = await CreateUser(username, password)

    res.status(result.status).send({message: result.message})
})

app.delete('/delete/:username', async (req,res) => {
    let username = req.params.username
    let result = await DeleteUser(username)

    res.status(result.status).send({message: result.message})
})

app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})