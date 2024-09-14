const bcrypt = require("bcrypt")
const models = require("../models/Schema")

// function login(){
//     let voterID = req.body.voterID.trim();
//     let inp_password = req.body.password.trim();
//     let result = await models.User.find({voterID:voterID})
//     if (result.length==1 && await bcrypt.compare(inp_password, result[0]["password"])){

//         const token = utils.generateJWT(result[0]["name"],voterID,result[0]["_id"] )
//         res.cookie("token", token, { httpOnly: true });
//         res.status(201).redirect("/home");
//     } else {
//         return res.render("login");
//     }
// }