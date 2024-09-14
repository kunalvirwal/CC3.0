const mongoose = require("mongoose")
require("dotenv").config()

async function ConnectDB(){
    let URI = await process.env.MONGODB_URI
    mongoose.connect(URI)
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

