const express = require('express')
const router = express.Router()

const users = require("../controllers/auth")
const {userById, orderHistory} = require("../controllers/user");
const order = require("../controllers/order");
const products = require("../controllers/product")

router.post('/order/create/:userId', users.requireSignIn, users.isAuth, orderHistory, products.decreaseQuantity, order.create );
router.get('/order/list/:userId', users.requireSignIn, users.isAuth, users.isAdmin, order.list)

router.param("userId", userById)

module.exports = router;