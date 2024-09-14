const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
const middlewares = require("../middlewares/Middlewares")

router.get("/login",(req,res)=>{
    console.log("hello")

    // controllers.login(req,res);
});

router.get("/ward/:wardName",(req,res)=>{
    console.log("hello")
    // res.status(200).send()
    controllers.ward(req,res);
});

router.post("/upvote/:issueID",(req,res)=>{
    console.log("UPVOTE");
    // res.status(200).send()
    controllers.upvote(req,res);
});

module.exports = router
