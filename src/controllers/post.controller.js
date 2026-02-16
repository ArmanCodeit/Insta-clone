const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){

    const { caption } = req.body;

    console.log(req.body, req.file);


    const extracted_token = req.cookies.token;


    if(!extracted_token){
        res.status(401).json({
            message: "token not provided, un-authorized access !"
        })
    }


    let decoded = null;
    try{
        decoded = jwt.verify(extracted_token, process.env.JWT_SECRET);
    } catch(err){
        return res.status(401).json({
            message: "un-authorised user !"
        })
    }

    console.log(decoded);


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully !",
        post
    })

}


async function getPostController(req,res){

    const extracted_token = req.cookies.token;
    

    if(!extracted_token){
        res.status(401).json({
            message: "token not provided, un-authorized access !"
        })
    }

    let decoded = null;
    try{
        decoded = jwt.verify(extracted_token, process.env.JWT_SECRET);
    } catch(err){
        return res.status(401).json({
            message: "Invalid token, unauthorized access !"
        })
    }

    const userId = decoded.id;
    
    
    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "posts fetched successfully !",
        posts
    })
}


async function getPostDetailsController(req,res){
    
    const extracted_token = req.cookies.token;

    if(!extracted_token){
        res.status(401).json({
            message: "token not provided, un-authorized access !"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(extracted_token, process.env.JWT_SECRET);
    } catch(err){
        return res.status(401).json({
            message: "Invalid token !"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;


    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "post not found !"
        })
    }

    const isValidUser = (post.user.toString() === userId);

    if(!isValidUser){
        return res.status(403).json({
            message: "forbidden content !"
        })
    }

    return res.status(200).json({
        message: "post fetched successfully",
        post
    })

}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}