const mongoose = require('mongoose')

const connectToMongoDb = async () => {
    try{
        await mongoose.createConnection('mongodb://localhost:27017/testmongodb', {
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