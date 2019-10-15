const express = require('express')
const controller = express.Router()
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
const nodeMailer = require('nodemailer');
require("dotenv").config();

const User = require('../models/user')

controller.signUp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user) {
            return res.status("401").json({
                error: "Cet adresse e-mail existe déja"
            });        
        } else {
            const user = new User(req.body)
            await user.save()
            res.json({user});
       
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
                to: user.email,
                subject: `Bienvenue ${user.name}`, 
                html: `<p>Bienvenue sur icesonBeats!<br/>Vous trouverez des instrumentales en tout genre.</p>
                <p>Chaque instrumentale est disponible qu\'une seule fois à l'achat. Vous en aurez l\'exclusivité!<br/>Bonne écoute.</p>
                Connectez-vous : ${process.env.API}/signin</p>`
            };
            transporter.sendMail(mailOptions,(err) => {
                if (err) { 
                    return res.status(500).send({ 
                        msg: err.message 
                    }); 
                }
                res.status(200).json('A verification email has been sent to ' + user.email + '.');
            });
        }
    }
    catch (err) {
        return console.log(err);
    }
}

controller.signIn = async (req, res) => {
    const{email, password} = req.body
    try {
        const user = await User.findOne({email}); 
        if(!user || !user.authenticate(password)) {
            return res.status(400).json({
                error: "Mauvais identifiant ou mot de passe"
            })   
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie('t', token, {expire: new Date() + 9999})
        const {_id, name, role, city, country, history} = user
        return res.json({token, user: {_id, email, name, role, city, country, history}
        });
    }
    catch (err) {
        return console.log(err);
    }   
}

controller.signOut = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Vous avez été déconnecté"})
}

controller.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

controller.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) {
        return res.status(403).json({
            error: 'Accès interdit'
        });
    }
    next();
}

controller.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'Accès interdit'
        })
    }
    next();
}

module.exports = controller;