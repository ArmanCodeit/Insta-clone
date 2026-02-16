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


module.exports = {
    createPostController
}