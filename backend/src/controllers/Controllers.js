const models = require("../model/Schema")
const mongoose = require("mongoose");
const utils = require("../utils/Utils")


async function login(req,res){
    let voterID = req.body.voterID;
    let inp_password = req.body.password;
    if (voterID==undefined ||inp_password==undefined){
        return res.status(406).send({error:"No voterID or password"});  // Invalid JWT token
    }
    let result = await models.Person.find({voterID:voterID});
    if (result.length==1 && voterID==inp_password){
        const token = utils.generateJWT(voterID,result[0]["ward"])
        let result1 = await models.WardList.find();
        let wards = result1.map((val) => {
            return val.wardName
        });
        res.status(200).send({ result:result , wards:wards , token:token})
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


async function upvote(req,res){
    let issueID = req.params.issueID;
    let userID = req.user.voterID
    if (!mongoose.Types.ObjectId.isValid(issueID)){
        return res.status(406).send({error:"Invalid Issue ID"});
    }
    let result = await models.Issue.find({_id:issueID});
    let result2
    if (result.length==1){
        result2 = await models.Person.find({voterID:userID})
        if (result2[0]["upvotes"].includes(result[0]["_id"])){
            return res.status(403).send({error:"Already Upvoted"});
        }
        result = result[0];
        result.upvotes++;
        result2[0]["upvotes"].push(result["_id"])

    } else {
        return res.status(406).send({error:"Invalid Issue ID"});
    }
    await result.save();
    await result2[0].save();
    res.status(200).send({response:"Upvoted Successfully"})
}


async function downvote(req,res){
    let issueID = req.params.issueID;
    let userID = req.user.voterID
    if (!mongoose.Types.ObjectId.isValid(issueID)){
        return res.status(406).send({error:"Invalid Issue ID"});
    }
    let result = await models.Issue.find({_id:issueID});
    let result2
    if (result.length==1){
        result2 = await models.Person.find({voterID:userID})
        if (!result2[0]["upvotes"].includes(result[0]["_id"])){
            return res.status(403).send({error:"Not Upvoted"});
        }
        result = result[0];
        result.upvotes--;
        
        let index = result2[0]["upvotes"].indexOf(result["_id"])
        if (index !== -1){
            result2[0]["upvotes"].splice(index,1)
        }

    } else {
        return res.status(406).send({error:"Invalid Issue ID"});
    }
    await result.save();
    await result2[0].save();
    res.status(200).send({response:"Removed Upvote"})
}


async function comment(req,res){
    let issueID = req.params.issueID;
    let userID = req.user.voterID;
    let content = req.body.content
    if (!mongoose.Types.ObjectId.isValid(issueID) || content==undefined){
        return res.status(406).send({error:"Invalid Issue ID"});
    }
    content = content.trim();
    if (content == ""){
        return res.status(406).send({error:"Empty message content"});
    }
    let issue = await models.Issue.find({"_id":issueID});
    issue=issue[0]
    let d = new Date(Date.now())
    let dateNtime = String(d).slice(4, 15)+" "+d.getHours()+":"+d.getMinutes()
    issue.messages.unshift({
        sender:userID,
        content:content,
        sentAt:dateNtime
    })

    await issue.save();
    res.status(201).send({response:"Commented Successfully"})
}

async function comparePrompt(req,res){
    let issueWard = req.params.wardName;
    let prompt = req.body.prompt
    
    if (prompt==undefined || issueWard==undefined ){
        return res.status(406).send({error:"Invalid prompt or ward name"});
    }
    let result1 = await models.WardList.find({wardName:issueWard.trim()});
    if (result1.length==0){
        return res.status(406).send({error:"Invalid ward name"});
    }
    let result = await models.Issue.find({issueWard:issueWard});
    let issueList = result.map((val) => {
        return val.heading
    })
    let response = await utils.sensorAndRelate(prompt,issueList)
    return res.status(200).send({response:response});
    

}


module.exports= {
    login,
    ward,
    upvote,
    downvote,
    comment,
    comparePrompt,
}
