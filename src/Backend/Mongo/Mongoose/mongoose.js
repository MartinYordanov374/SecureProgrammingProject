const mongoose = require('mongoose')
const {loadEnvFile} = require('process')
loadEnvFile('../../../.env')

const connectToMongoDb = async () => {
    try{
        await mongoose.connect(`${process.env.MONGOOSE_CONNECTION_STRING}`, {
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