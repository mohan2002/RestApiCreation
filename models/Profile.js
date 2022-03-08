const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true,
        default:Date.now
    },
    Gender:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Profile',ProfileSchema) // using the name Subscriber we can access the model wherever needed.