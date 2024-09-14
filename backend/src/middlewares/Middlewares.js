const jwt = require("jsonwebtoken");
require("dotenv").config();


function auth_user(req,res,next){
    const { authorization } = req.headers;
    // if (req.user){
    //     res.clearCookie("token");
    //     return res.status(400);  // User not authenticated, Can't access route!
    // }
    if (authorization) {
        try {
            const token = authorization.split(' ')[0];
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            return res.status(403).redirect("/");  // Invalid JWT token
        }
    } else {
        return res.status(403).redirect("/");  // Invalid JWT token
    }
    next();
}

module.exports={
    auth_user,
}