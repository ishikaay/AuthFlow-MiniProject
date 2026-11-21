const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/miniproject')

// define schema
const userSchema = mongoose.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    profilePic:{
        type: String,
        default:"defaultImage.jpg"
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ]
})

module.exports = mongoose.model('user',userSchema)