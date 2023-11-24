"use strict"

const router = require("express").Router()

//users
router.use("/users",require("./user"))


//tokens
router.use("/tokens",require("./token"))

//categories
router.use("/categories",require("./category"))

module.exports= router;