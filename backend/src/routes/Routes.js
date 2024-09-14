const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
const middlewares = require("../middlewares/Middlewares")

router.get("/login",(req,res)=>{
    controllers.login(req,res);
});

router.get("/ward/:wardName",(req,res)=>{
    console.log("hello")
    // res.status(200).send()
    controllers.ward(req,res);
});

module.exports = router
