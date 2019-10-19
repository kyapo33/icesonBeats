const express = require('express')
const router = express.Router()

const category = require("../controllers/category");
const users = require("../controllers/auth")
const {userById} = require("../controllers/user");

router.post('/category/create/:userId', users.requireSignIn, users.isAuth, users.isAdmin, category.create);
router.get('/category/:categoryId', category.read);
router.delete('/category/delete/:categoryId/:userId', users.requireSignIn, users.isAuth, users.isAdmin, category.remove);
router.get('/category', category.list);


router.param("categoryId", category.getById)
router.param("userId", userById)

module.exports = router;