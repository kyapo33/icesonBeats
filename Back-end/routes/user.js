const express = require('express')
const router = express.Router()

const users = require("../controllers/auth")
const {userEditValidator, passwordResetValidator, changePasswordValidator, forgotPasswordValidator, contactValidator} = require("../validator");
const {userById, read, update, purchaseHistory, changePassword, forgotPassword, resetPassword, contact} = require("../controllers/user");

router.get('/:userId', users.requireSignIn, users.isAuth, users.isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.get('/customers/:userId', users.requireSignIn, users.isAuth, read);
router.put('/customers/update/:userId', users.requireSignIn, users.isAuth, userEditValidator, update);
router.get('/customers/order/:userId', users.requireSignIn, users.isAuth, purchaseHistory);
router.put("/change-password/:userId", users.requireSignIn, users.isAuth, changePasswordValidator, changePassword);
router.put("/forgot-password", forgotPasswordValidator, forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
router.post("/contact", contactValidator, contact);

router.param("userId", userById)

module.exports = router;