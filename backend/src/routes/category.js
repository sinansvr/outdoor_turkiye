"use strict"

const router = require('express').Router()

const category = require('../controllers/category')
const permission = require("../middlewares/permissions")

// URL: /categories

router.route('/')
    .get(category.list)
    .post(permission.isAdmin, category.create)

router.route('/:id')
    .get(permission.isLogin, category.read)
    .put(permission.isAdmin, category.update)
    .patch(permission.isAdmin, category.update)
    .delete(permission.isAdmin, category.delete)


module.exports = router