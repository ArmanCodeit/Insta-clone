const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exists , try another username"],
        required: [true, "username is mandatory"]
    },
    email: {
        type: String,
        unique: [true, "email already exists , try another email"],
        required: [true, "email is mandatory"]
    },
    password: {
        type: String,
        required: [true, "password is mandatory"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://i.pinimg.com/564x/c5/07/8e/c5078ec7b5679976947d90e4a19e1bbb.jpg"
    },
    isPrivate:{
        type:Boolean,
        default:false
   }
})

const userModel = mongoose.model("users",userSchema);


module.exports = userModel;