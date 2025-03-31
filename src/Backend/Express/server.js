const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')

const app = express()
const APP_PORT = 5001

app.use(express.json())

app.post('/login', async (req,res)  => {
    console.log('logging in')
})

app.post('/register', async (req,res) => {
    console.log('registering')
})

app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})