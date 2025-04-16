const mongoose = require('mongoose')

const connectToMongoDb = async () => {
    try{
        await mongoose.connect('mongodb://mongo:27017/seprodb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('successfully connected to db')
    }
    catch(err)
    {
        console.log('an error occured connecting to the database', err)
    }
}

module.exports = connectToMongoDb;