const express = require('express')
const router = express.Router()

const users = require("../controllers/auth")
const {userEditValidator, passwordResetValidator, changePasswordValidator, forgotPasswordValidator, contactValidator} = require("../validator");
const {userById, read, update, purchaseHistory, changePassword, forgotPassword, resetPassword, contact} = require("../controllers/user");

router.get('/userone/customers/:userId', users.requireSignIn, users.isAuth, read);
router.put('/userone/customers/update/:userId', users.requireSignIn, users.isAuth, userEditValidator, update);
router.get('/userone/customers/order/:userId', users.requireSignIn, users.isAuth, purchaseHistory);
router.put("/userone/change-password/:userId", users.requireSignIn, users.isAuth, changePasswordValidator, changePassword);
router.put("/userone/forgot-password", forgotPasswordValidator, forgotPassword);
router.put("/userone/reset-password", passwordResetValidator, resetPassword);
router.post("/userone/contact", contactValidator, contact);

router.param("userId", userById)

module.exports = router;