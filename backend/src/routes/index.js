"use strict"

const router = require("express").Router()

//users
router.use("/users",require("./user"))

//tokens
router.use("/tokens",require("./token"))

//categories
router.use("/categories",require("./category"))

//blogs
router.use("/blogs",require("./blog"))

//documents
router.use("/documents",require("./document"))

module.exports= router;