const models = require("../models/Schema")
const mongoose = require("mongoose");
const utils = require("../utils/Utils")


async function login(req,res){
    let voterID = req.body.voterID;
    let inp_password = req.body.password;
    if (voterID==undefined ||inp_password==undefined){
        return res.status(406).send({error:"No voterID or password"});  // Invalid JWT token
    }
    voterID = voterID.trim()
    inp_password = inp_password.trim() 
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
    let wardName = req.params.wardName.trim();
    let result = await models.WardList.find({wardName:wardName})
    if (result.length!=1){
        return res.status(404).send({error:"Invali ward name"});
    }
    result = await models.Issue.find({issueWard:wardName})
    res.status(200).send(result)
}

async function createIssue(req,res){
    let senderID = req.user.voterID;
    let senderWard = req.user.wardName;
    let issueWard = req.body.issueWard;
    let heading = req.body.heading;
    let body = req.body.body;
    let tags = req.body.tags;
    if (issueWard==undefined || heading==undefined || body==undefined || tags==undefined || heading.trim()==""){
        return res.status(406).send({error:"Fields missing"});
    }
    let ward = await models.Ward.find({ward:issueWard.trim()})
    
    if (ward.length!=1){
        return res.status(404).send({error:"Invalid ward name"});
    }
    ward= ward[0]
    let invalid = false
    tags.forEach(val => {
        if (!ward["_doc"]["wardTag"].includes(val)){
           invalid = true
        }
    });
    if (invalid){
        return res.status(406).send({error:"Invalid ward tags"})
    }
    let issue = new models.Issue({
        senderID : senderID,
        senderWard : senderWard,
        issueWard : issueWard.trim(),
        heading : heading.trim(),
        body : body,
        upvotes : 0,
        completed : false,
        tags : tags,
        messages : []
    })

    await issue.save()
    return res.status(201).send({response:"Issue created successfully"})
    
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
    createIssue,
    upvote,
    downvote,
    comment,
    comparePrompt,
}
