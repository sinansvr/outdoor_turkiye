"use strict"
const router = require("express").Router()

//USER ROUTER

const User = require("../controllers/user")

router.route("/")
    .get(User.list)
    .post(User.create)

router.route("/:id")
    .get(User.read)
    .update(User.update)
    .patch(User.update)
    .delete(User.delete)

module.exports=router