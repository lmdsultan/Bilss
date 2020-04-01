//5
const mongoose = require('mongoose')
//6
const config = require('config')
//7
const db = config.get('mongoURI')
//8
const connectDB = async () => {
    try{
       await mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        console.log("Database is up")
    }   catch(err){
        console.error(err.message)
        process.exit(1)
    }
}
//9
module.exports = connectDB