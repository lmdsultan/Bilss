//14
const mongoose = require('mongoose')
//15
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
})
//16
module.exports = User = mongoose.model('user', UserSchema)