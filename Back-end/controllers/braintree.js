const braintree = require('braintree')
require("dotenv").config();

const User = require('../models/user');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = async (req, res) => {
    gateway.clientToken.generate({},function(err, response) {
        if(err) {
            res.status(500).send(err) ;   
        } else { 
            res.send(response);
        }
    })
}

exports.processPayment = async (req, res) => {
    let nonceClient = req.body.paymentMethodNonce;
    let amountClient = req.body.amount;

    let newTransaction = gateway.transaction.sale({
        amount: amountClient,
        paymentMethodNonce: nonceClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result) => {
        if(error) {
            res.status(500).json(error) ;  
        } else {
            res.json(result);
        }
    })
}