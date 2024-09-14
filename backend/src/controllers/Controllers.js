const bcrypt = require("bcrypt")
const models = require("../models/Schema")
const mongoose = require("mongoose");

async function ward(req,res){
    let wardName = req.params.wardName;
    let result = await models.Issue.find({issueWard:wardName})
    if (result.length==1){
        res.send(result);
    } else {
        return res.status(406).send({error:"Invalid Ward Name"});
    }
}

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

module.exports= {
    ward,
    upvote
}