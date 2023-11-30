"use strict"

const router = require('express').Router()

const blog = require('../controllers/blog')
const permission = require("../middlewares/permissions")


// URL: /blogs

router.route('/')
    .get(blog.list)
    .post(permission.isLogin, blog.create)

router.route('/:id')
    .get(permission.isLogin, blog.read)
    .put(permission.isLogin, blog.update)
    .patch(permission.isLogin ,blog.update)
    .delete(permission.isLogin ,blog.delete)


module.exports = router