"use strict";

//express
const express= require("express")
const app=express()

//.env 
require("dotenv").config();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

//async-errors
require("express-async-errors")

//JSON data
app.use(express.json())


//Home Page
app.all("/",(req,res)=>{

    res.send({
        error:false,
        message:"Welcome to OutDoor Türkiye API!"
    })

})
//errorHandler
app.use(require("./src/middlewares/errorHandler"))

//Listening PORT
app.listen(PORT,()=>console.log(`Running at: http://${HOST}:${PORT}`))