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
            message: `Already ${isAlreadyFollowing.status}`,
            follow: isAlreadyFollowing
        })
    }


    /**
     * follow that user (create a record in follows collection)
     */
    // PRIVATE ACCOUNT
    if(isFolloweeExists.isPrivate){

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername,
            status:"pending"
        });

        return res.status(201).json({
            message:`Follow request sent to ${followeeUsername}`,
            follow: followRecord
        });
    }

    // PUBLIC ACCOUNT
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status:"accepted"
    });

    return res.status(201).json({
        message:`You are now following ${followeeUsername}`,
        follow: followRecord
    });
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

async function sendFollowRequest(req,res){

    const follower = req.user.username;
    const followee = req.params.username;

    if(follower === followee){
        return res.json({message:"You cannot follow yourself"});
    }

    const request = await followModel.create({
        follower,
        followee,
        status:"pending"
    });

    return res.json({
        message:"Follow request sent",
        request
    });
}

async function acceptRequest(req,res){

    const followee = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOneAndUpdate(
        { follower, followee, status:"pending" },
        { status:"accepted" },
        { new:true }
    );

    if(!request){
        return res.json({message:"No pending request"});
    }

    return res.json({
        message:"Follow request accepted",
        request
    });
}


async function rejectRequest(req,res){

    const followee = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOneAndUpdate(
        { follower, followee, status:"pending" },
        { status:"rejected" },
        { new:true }
    );

    if(!request){
        return res.json({message:"No pending request"});
    }

    return res.json({
        message:"Follow request rejected",
        request
    });
}


async function getPendingRequests(req,res){

    const username = req.user.username;

    const requests = await followModel.find({
        followee: username,
        status:"pending"
    });

    res.json(requests);
}

module.exports = {
    followUserController,
    unfollowUserController,
    sendFollowRequest,
    acceptRequest,
    rejectRequest,
    getPendingRequests
}