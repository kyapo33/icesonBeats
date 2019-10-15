const express = require('express')
const router = express.Router()

const users = require("../controllers/auth")
const {userById} = require("../controllers/user");
const {generateToken, processPayment} = require("../controllers/braintree");

router.get('/braintree/getToken/:userId', users.requireSignIn, users.isAuth, generateToken);
router.post('/braintree/payment/:userId', users.requireSignIn, users.isAuth, processPayment)

router.param("userId", userById)

module.exports = router;