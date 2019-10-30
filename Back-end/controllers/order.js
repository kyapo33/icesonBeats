const express = require('express')
const controller = express.Router()
const nodeMailer = require('nodemailer');
const hbs = require('../node_modules/nodemailer-express-handlebars');
require("dotenv").config();
const fastcsv = require('fast-csv');

const {Order, CartItem} = require('../models/order')

controller.getById = async (req, res, next, id) => {
    try {
        const order = await Order.findById(id)
        .populate('user', 'name email')
        .exec()
        if(!order) {
            return res.status(400).json({
                error: 'Aucune commande trouvé'
            })   
        }
        req.order = order;
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucune comande trouvé'
        })  
    }
}

controller.read = (req, res) => {
    return res.json(req.order);
}

controller.create = async (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    try {
        const data = await order.save()
        res.json(data)

        let transporter = nodeMailer.createTransport({
            host: process.env.MAILER_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });
        const handlebarOptions = {
            viewEngine: {
              extName: '.hbs',
              partialsDir: 'views/bill',
              layoutsDir: 'views/bill',
              defaultLayout: 'bill.hbs',
            },
            viewPath: 'views/bill',
            extName: '.hbs',
        };
        transporter.use('compile', hbs(handlebarOptions));
            let mailOptions = {
                from: process.env.MAILER_USER,
                to: order.user.email,
                subject: 'Commande', 
                template: 'bill',
                context: {
                    orderid : order._id,
                    dateorder : order.createdAt,
                    username : order.user.name,
                    useremail : order.user.email,
                    products: order.products,
                    total: order.amount
                },
            };
        transporter.sendMail(mailOptions,(err) => {
            if (err) { 
                return res.status(500).send({ 
                    msg: err.message 
                }); 
            }
            res.status(200).json('A verification email has been sent to ' + user.email + '.');
        }); 
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            path: `views/bill/${order._id}.csv`,
            header: [
                {id: 'name', title: 'Commande'},
                {id: 'total', title: 'Total'},
                {id: 'date', title: 'Date'}
            ]
        });
        const records = [
            {name: `${order._id}`,  total: `${order.amount}`, date: `${order.createdAt}` },
        ];
        csvWriter.writeRecords(records) 
        .then(() => {
            console.log('...Done');
        });
    }
    catch (err) {
        return res.status(400).json({
            error: 'aucune commande'
        })    
    }
}

controller.list = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', "_id name email")
            .sort("-createdAt")
            .exec()
        return res.json(orders);

    }
    catch (err) {
        return res.status(400).json({
            error: 'aucune commande'
        });    
    }
}

module.exports = controller;