const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();


/**
 * @route POST /api/users/follow/:username
 * @description follow a user
 * @access Private
 */
userRouter.post("/follow/:username",identifyUser ,userController.followUserController)

/**
 * @route POST /api/users/unfollow/:username
 * @description unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username",identifyUser ,userController.unfollowUserController)


/**
 * POST to send follow-request with pending state
 */
userRouter.post("/follow-request/:username",identifyUser,userController.sendFollowRequest);


/**
 * making request accept by replacing pending with accepted
 */
userRouter.post("/accept/:username",identifyUser,userController.acceptRequest);


/**
 * making request accept by replacing pending with rejected
 */
userRouter.post("/reject/:username",identifyUser,userController.rejectRequest);


/**
 * making show list of pending request
 */
userRouter.get("/requests",identifyUser,userController.getPendingRequests);

module.exports = userRouter;