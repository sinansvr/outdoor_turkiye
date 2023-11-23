"use strict"

const mongoose = require("mongoose")

const dbConnection = function (){
    mongoose.connect(process.env.MONGO_DB,{ useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=>console.log("--DB Connected!--"))
            .catch((err)=>console.log("DB not Connected!--",err))
}

module.exports={
    dbConnection,
    mongoose
}