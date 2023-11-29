"use strict"
const router = require("express").Router()

//user ROUTER

const user = require("../controllers/user")
const auth = require("../controllers/auth")

router.route("/")
    .get(user.list)
    // .post(user.create)

router.route("/register").post(user.create)

router.route("/:id")
    .get(user.read)
    .put(user.update)
    .patch(user.update)
    .delete(user.delete)

router.route("/login").post(auth.login)
router.route("/logout").post(auth.logout)

module.exports=router