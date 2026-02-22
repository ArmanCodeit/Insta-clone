const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");


async function followUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    /**
     * cannot follow self 
     */
    if(followeeUsername === followerUsername){
        return res.status(400).json({
            message: "You cannot follow yourself !"
        })
    }

    /**
     * whether user exists or not by this username
     */
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message: "user you are trying to follow doesn't exist !"
        })
    }


    /**
     * whether you are already following that user or not
     */
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following ${followeeUsername}!`,
            follow: isAlreadyFollowing
        })
    }


    /**
     * follow that user (create a record in follows collection)
     */
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `You are not following ${followeeUsername}!`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}!`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}