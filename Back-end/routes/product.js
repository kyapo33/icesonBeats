const express = require('express')
const router = express.Router()

const products = require("../controllers/product")
const users = require("../controllers/auth")
const {userById} = require("../controllers/user");

router.post('/create/:userId', users.requireSignIn, users.isAuth, users.isAdmin, products.create);
router.get('/:productId', products.read);
router.delete('/delete/:productId/:userId', users.requireSignIn, users.isAuth, users.isAdmin, products.remove);
router.put('/edit/:productId/:userId', users.requireSignIn, users.isAuth, users.isAdmin, products.update);
router.get('/', products.list);

router.param("userId", userById)
router.param("productId", products.getById)

module.exports = router;