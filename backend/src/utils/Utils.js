const jwt = require("jsonwebtoken");

function generateJWT(voterID,wardName) {
    // jwt payload
    data = {
        voterID:voterID,
        wardName:wardName
    };
    return jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

module.exports = {
    generateJWT,
}