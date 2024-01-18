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

//DB Connection
const {dbConnection} = require("./src/configs/dbConnection")
dbConnection()

//Logging
// app.use(require("./src/middlewares/logger"))

//JSON data
app.use(express.json())


//Find/Pagination
app.use(require('./src/middlewares/findSearchSortPage'))

//CORS
app.use(require('cors')())


//Home Page

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to  OutDoor Türkiye API!',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

//Authentication
app.use(require("./src/middlewares/authentication"))

//Router
app.use(require("./src/routes"))

//Middlewares
app.use(require("./src/middlewares/findSearchSortPage"))

//Documentation Swagger and Redoc

// Swagger
const swaggerUI=require("swagger-ui-express");
const swaggerJson=require("./src/configs/swagger.json")

app.use("/docs/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson))

//Redoc
const redoc = require('redoc-express')
app.use('/docs/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})
app.use('/docs/redoc', redoc({
    specUrl: '/docs/json',
    title: 'API Docs',
   
}))

//errorHandler
app.use(require("./src/middlewares/errorHandler"))

//Listening PORT
app.listen(PORT,()=>console.log(`Running at: http://${HOST}:${PORT}`))