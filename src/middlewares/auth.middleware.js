const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
    const extracted_token = req.cookies.token;

    if (!extracted_token) {
        res.status(401).json({
            message: "token not provided, un-authorized access !"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(extracted_token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "un-authorised user !"
        })
    }

    console.log(decoded);
    
    req.user = decoded;

    next();
}

module.exports = identifyUser;