const express = require('express')
const router = express.Router()

const user = require("../controllers/auth");
const {userSignupValidator} = require("../validator");

router.post('/user/register', userSignupValidator, user.signUp);
router.post('/user/login', user.signIn);
router.get('/user/logout', user.signOut);

module.exports = router;