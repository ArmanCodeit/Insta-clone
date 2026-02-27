const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

/* 
** POST /api/auth/register
*/
authRouter.post("/register", authController.registerController)


/* 
** POST /api/auth/login
*/
authRouter.post("/login", authController.loginController)


/**
 * @route GET /api/auth/get-me
 * @description Get the currently logged-in user's information
 * @access private
 */
authRouter.get("/get-me",identifyUser ,authController.getMeController)

module.exports = authRouter;