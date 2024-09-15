const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
const middlewares = require("../middlewares/Middlewares")

router.get("/login",(req,res)=>{
    controllers.login(req,res);
});

router.get("/ward/:wardName",(req,res)=>{
    console.log("hello")
    controllers.ward(req,res);
});

router.post("/upvote/:issueID",(req,res)=>{
    controllers.upvote(req,res);
});

router.post("/downvote/:issueID",(req,res)=>{
    controllers.downvote(req,res);
});

// router.post("/comment/:issueID",(req,res)=>{
//     controllers.comment(req,res);
// });

module.exports = router
