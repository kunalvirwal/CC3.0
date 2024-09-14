const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const configs = require("./configs/Database")
const middlewares = require("./middlewares/Middlewares")

require("dotenv").config();

const PORT = process.env.PORT || 5000;
configs.ConnectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("",middlewares.auth_user)

app.use("",require("./routes/Routes"))

app.listen(PORT,(error)=>{
    if (error) throw error;
})