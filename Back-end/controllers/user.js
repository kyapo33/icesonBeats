const _ = require('lodash');
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
require("dotenv").config();

const { Order } = require("../models/order");

exports.userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec()
        if(!user) {
            return res.status(400).json({
                error: 'Utilisateur non touvé'
            })   
        }
        req.profile = user;
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: 'Utilisateur non touvé'
        })  
    }
}

exports.read = (req, res) => {
    req.profile.hash_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}
 
exports.update = async (req, res) => {
    req.body.role = 0;
    let user = req.profile;
    user = _.extend(user, req.body); 
    user.updated = Date.now();
    try {
        await user.save()
            user.hashed_password = undefined;
            user.salt = undefined;
        return res.json(user);
    }
    catch (err) {
        return res.status(400).json({
            error: 'Changement impossible'
        });    
    }
};

exports.orderHistory = async (req, res, next) => {
    let history = [];
    try {
        await req.body.order.products.forEach(item => {
            history.push({
                _id: item._id,
                name: item.name,
                category: item.category,
                transaction_id: req.body.order.transaction_id,
                amount: req.body.order.amount
            });
        });
        await User.findByIdAndUpdate(
            { _id: req.profile._id },
            { $push: { history: history } },
            { safe: true, upsert: true }) 
        next();  
    }
    catch (err) {
        return res.status(400).json({
            error: "Aucune commande"
        });   
    }
};

exports.purchaseHistory = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.profile._id })
            .populate("User", "_id name")
            .sort("-createdAt")
            .exec() 
        return res.json(orders);
    }
    catch (err) {
        return res.status(400).json({
            error: "Aucune commande"
        });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("signin req.body", email);
    try {
        const user = await User.findOne({ email }) 
        if (!user) {
            return res.status("401").json({
                error: "L'utilisateur n'existe pas"
            });
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
     
        let transporter = nodeMailer.createTransport({
            host: process.env.MAILER_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });
        let mailOptions = {
            from: process.env.MAILER_USER,
            to: email,
            subject: "Mot de passe oublié",
            text: `Pour changer votre mot de passe cliquer ici: 
            ${process.env.API}/reset-password/${token}`,
            html: `<p>Pour changer votre mot de passe cliquer ici:</p> <p>
                ${process.env.API}/reset-password/${token}</p>`
        };
        return await user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ message: err });
            } else {
                transporter.sendMail(mailOptions,(err) => {
                    if (err) { 
                        return res.status(500).send({ 
                            msg: err.message 
                        }); 
                    }
                    res.status(200).json('un mail de verification a été envoyé a ' + email + '.');
                });
            }
        });        
    }
    catch (err) {
        return res.status(500).send({ 
            msg: err.message 
        });    
    }
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
    try {
        const user = await User.findOne({ resetPasswordLink })
        if (!user) {
            return res.status("401").json({
                error: "Lien invalide!"
            });    
        }
        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ""
        };
        _.extend(user, updatedFields);
        user.updated = Date.now();
        await user.save()
        return res.json(user)
    }
    catch (err) {
        return res.status("401").json({
            error: "Changement impossible"
        });    
    }
};

exports.changePassword = async (req, res) => {
    const { email, password, changedPassword} = req.body;
    try {
        const user = await User.findOne({ email});
        if (!user || !user.authenticate(password)) {
            return res.status("401").json({
                error: "Mot de passe invalide"
            });    
        }
        const updatedFields = {
            password: changedPassword,
        };
        _.extend(user, updatedFields);
        user.updated = Date.now();
        await user.save()
        return res.json({
            user,
            message: `Votre mot de passe a été mis a jour.`
        })
    }
    catch (err) {
        return res.status("401").json({
            error: "Changement impossible"
        });    
    }
};

exports.contact = async (req, res) => {
    const {email, name, message} = req.body
    let transporter = nodeMailer.createTransport({
        host: process.env.MAILER_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });
    let mailOptions = {
        from: process.env.MAILER_USER,
        to: 'kevin.yapo@hotmail.fr',
        subject: 'Contact', 
        html: `<p>De: ${email}</p>
            <p>Nom: ${name}</p>
            <p>Message: ${message}</p>`
        };
    transporter.sendMail(mailOptions,(err) => {
        if (err) { 
            return res.status(500).send({ 
                err: 'L\'envoi de votre message a échoué' 
            }); 
        }
        res.status(200).json('Le message a été envoyé ');
    });
}