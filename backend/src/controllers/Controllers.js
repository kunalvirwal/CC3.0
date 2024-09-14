const bcrypt = require("bcrypt")
const models = require("../models/Schema")

async function ward(req,res){
    let wardName = req.params.wardName;
    let result = await models.Issue.find({issueWard:wardName})
    if (result.length==1){
        res.send(result);
    } else {
        return res.status(406).send({error:"Invalid Ward Name"});
    }
}

module.exports= {
    ward,
}