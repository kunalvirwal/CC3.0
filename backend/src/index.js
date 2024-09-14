const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const middlewares = require("./middlewares/Middlewares")

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("",require("./routes/Routes"))

http.listen(PORT,(error)=>{
    if (error) throw error;
})