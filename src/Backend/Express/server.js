const express = require('express')
const connectToMongoDb = require('../Mongo/Mongoose/mongoose')

const app = express()
const APP_PORT = 5001
app.use(express.json())


app.listen(APP_PORT, async (res) => {
    await connectToMongoDb()
    console.log('SERVER LISTENING ON PORT ', APP_PORT)
})