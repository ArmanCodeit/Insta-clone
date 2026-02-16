const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



async function registerController(req,res){

    const { email, username, password, bio, profileImage} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {email: email},
            {username: username}
        ]
    })

    if(isUserAlreadyExists){
        res.status(409).json({
            message: "user already exists !" + (isUserAlreadyExists.email ? "email already exists" : "username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username: username,
        email: email,
        bio: bio,
        profileImage: profileImage,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token);


    res.status(201).json({
        message: "user registered successfully !",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req,res){
    
    const { username, email, password } = req.body;

    /* 
    ** now we are making functionality that user can login via username+password or email+password 
    */

    const user = await userModel.findOne({
        $or: [
            {
                /* 
                * condition if username exists then user will be returned having username if not exists then username = undefined (that no user is defined with this username in DB)
                 */
                username: username
            },
            {
                /* 
                * condition if email exists then user will be returned having email if not exists then email = undefined (that no user is defined with this email in DB)
                 */
                email: email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "user not found !"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "password invalid !"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token",token);

    res.status(200).json({
        message: "user logged in successfully !",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })


}

module.exports = {
    registerController,
    loginController
}