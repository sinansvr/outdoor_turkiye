"use strict"

const router = require('express').Router()

// routes/token:

// const { isAdmin } = require('../middlewares/permissions')
const token = require('../controllers/token')
const permission = require("../middlewares/permissions")

// URL: /tokens

// router.use(isAdmin)

router.route('/')
    .get(permission.isAdmin, token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)


module.exports = router