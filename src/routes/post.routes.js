const express = require("express");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const postRouter = express.Router();


const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage})




/**
 * POST /api/posts [protected -> user with token can only access !]
 */
postRouter.post("/",upload.single("image") ,identifyUser, postController.createPostController)


/**
 * GET /api/posts
 */
postRouter.get("/", identifyUser, postController.getPostController)


/**
 * GET /api/posts/details/:postid
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)


/**
 * @route POST api/posts/like/:postId
 * @description like a post with the id provided in the requests params
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter;