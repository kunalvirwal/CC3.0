const models = require("../models/Schema")
const mongoose = require("mongoose");
const utils = require("../utils/Utils")

async function upvote(req,res){
    let id = req.params.issueID;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(406).send({error:"Invalid UPVOTE ID"});
    }
    let result = await models.Issue.find({_id:id});
    if (result.length==1){
        result = result[0];
        result.upvotes++;
    } else {
        return res.status(406).send({error:"Invalid UPVOTE ID"});
    }
    await result.save();
    res.send("DONE");
}


async function login(req,res){
    let voterID = req.body.voterID.trim();
    let inp_password = req.body.password.trim();
    let result = await models.Person.find({voterID:voterID});
    if (result.length==1 && voterID==inp_password){
        const token = utils.generateJWT(voterID,result[0]["ward"])
        let result1 = await models.WardList.find();
        let wards = result1.map((val) => {
            return val.wardName
        });
        console.log(wards)
        res.status(200).send({ ward:result[0].ward , wards:wards , token:token})
    } else {
        return res.status(406).send({error:"Invalid voterID"});  // Invalid JWT token
    }
}


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
    upvote,
    login
}
