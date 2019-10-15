exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Un nom est requis' ).notEmpty()
    req.check('email', 'Email trop court')
        .matches(/.+\@.+\..+/)
        .withMessage("Email doit comprendre un @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Un mot de passe est requis').notEmpty()
    req.check('password')
        .isLength({min:6})
        .withMessage('Mot de passe trop court')
        .matches(/\d/)
        .withMessage('Le mot de passe doit comprende un chiffre');
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg) [0]
        return res.status(400).json({ error: firstError});
    }
    next();
}

exports.userEditValidator = (req, res, next) => {
    req.check('name', 'Un nom est requis' ).notEmpty()
    req.check('email', 'Email trop court')
        .matches(/.+\@.+\..+/)
        .withMessage("Email doit comprendre un @")
        .isLength({
            min: 4,
            max: 32
        });
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg) [0]
        return res.status(400).json({ error: firstError});
    }
    next();
}

exports.passwordResetValidator = (req, res, next) => {
    req.check('newPassword', 'Un mot de passe est requis').notEmpty()
    req.check('newPassword')
        .isLength({min:6})
        .withMessage('Mot de passe trop court')
        .matches(/\d/)
        .withMessage('Le mot de passe doit comprende un chiffre');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}

exports.changePasswordValidator = (req, res, next) => {
    req.check('password', 'Un mot de passe est requis').notEmpty()
    req.check('password')
        .isLength({min:6})
        .withMessage('Mot de passe trop court')
        .matches(/\d/)
        .withMessage('Le mot de passe doit comprende un chiffre');
    req.check('changedPassword', 'un nouveau mot de passe est requis').notEmpty()
    req.check('changedPassword')
        .isLength({min:6})
        .withMessage('Le nouveau mot de passe est trop court')
        .matches(/\d/)
        .withMessage('Le nouveau mot de passe doit comprende un chiffre');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}

exports.forgotPasswordValidator = (req, res, next) => {
    req.check('email', 'Une adresse e-mail est requise' ).notEmpty()
    req.check('email', 'Email trop court')
        .matches(/.+\@.+\..+/)
        .withMessage("Email doit comprendre un @")
        .isLength({
            min: 4,
            max: 32
        });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
    }

exports.contactValidator = (req, res, next) => {
    req.check('name', 'Un nom est requis' ).notEmpty()
    req.check('message', 'Un message est requis' ).notEmpty()
    req.check('email', 'Une adresse e-mail est requise' ).notEmpty()
    req.check('email', 'Email trop court')
        .matches(/.+\@.+\..+/)
        .withMessage("Email doit comprendre un @")
        .isLength({
            min: 4,
            max: 32
        });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}