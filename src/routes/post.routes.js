const express = require("express");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();


const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage})




/**
 * POST /api/posts [protected -> user with token can only access !]
 */
postRouter.post("/",upload.single("image") , postController.createPostController)

module.exports = postRouter;