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

// Likes
router.route('/:id/like').put(permission.isLogin, blog.like)

// Add Comment
router.route('/:id/comments').post(permission.isLogin, blog.addComment);

//  Delete Comment
router.route('/:id/comments/:commentId').delete(permission.isLogin, blog.deleteComment);


module.exports = router