const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
const middlewares = require("../middlewares/Middlewares")

router.post("/login",(req,res)=>{
    controllers.login(req,res);
});

router.post("/ward/:wardName",(req,res)=>{
    controllers.ward(req,res);
});

router.post("/createIssue",(req,res)=>{
    controllers.createIssue(req,res);
});

router.post("/upvote/:issueID",(req,res)=>{
    controllers.upvote(req,res);
});

router.post("/downvote/:issueID",(req,res)=>{
    controllers.downvote(req,res);
});

router.post("/comment/:issueID",(req,res)=>{
    controllers.comment(req,res);
});

router.post("/compareIssues/:wardName",(req,res)=>{
    controllers.comparePrompt(req,res);
});

module.exports = router
