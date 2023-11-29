"use strict"
const router = require("express").Router()

//USER ROUTER

const User = require("../controllers/user")
const Auth = require("../controllers/auth")

router.route("/")
    .get(User.list)
    .post(User.create)

router.route("/:id")
    .get(User.read)
    .put(User.update)
    .patch(User.update)
    .delete(User.delete)

router.route("/login").post(Auth.login)

module.exports=router