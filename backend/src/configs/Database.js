const mongoose = require("mongoose")
require("dotenv").config()

function ConnectDB(){
    mongoose.connect(process.env.MONGODB_URI)
        .then((result) => {
            console.log("Connected to DB")
        })
        .catch(err => {
            if (err){
                console.log("Unable to create connection to database\n\n")
                throw err
            }
        })
        
}

module.exports= {
    ConnectDB,
}

