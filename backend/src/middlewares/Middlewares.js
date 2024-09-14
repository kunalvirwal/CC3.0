const jwt = require("jsonwebtoken");
require("dotenv").config();


function auth_user(req,res,next){
    const { authorization } = req.headers;

    console.log(req.path);
    if (req.path =="/login"){
        next()
    }
    
    if (authorization ) {
        try {
            const token = authorization.split(' ')[0];
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = payload.data;
        } catch (err) {
            return res.status(401).send({error:"invalid jwt token"});  // Invalid JWT token
        }
    } else {
        return res.status(406).send({error:"missing jwt token"});  // Invalid JWT token
    }
    next();
}

module.exports={
    auth_user,
}
