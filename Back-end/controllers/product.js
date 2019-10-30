const express = require('express')
const controller = express.Router()
const _ = require('lodash');

const Product = require('../models/product')

controller.getById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id).exec()
        if(!product) {
            return res.status(400).json({
                error: 'Aucun produit trouvé'
            })   
        }
        req.product = product;
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucun produit trouvé'
        })  
    }
}

controller.read = (req, res) => {
    return res.json(req.product);
}

controller.create = async (req, res) => {
    const product = new Product(req.body)
    try {
        const data = await product.save()
        return res.json({data});
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucun produit'
        })    
    }
}

controller.remove = async (req, res) => {
    let product = req.product
    try {
        await product.remove()
        return res.json({ 
            message: "Le Produit a bien été supprimé"
        }); 
    }
    catch (err) {
        return res.status(400).json({
            error: "Suppression échoué"
        })   
    }
}

controller.update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            {_id: req.product._id},
            {$set: req.body}, 
            {new: true}) 
        return res.json(product)
    }
    catch (err) {
        return res.status(400).json({
            error: 'Modification échoué'
        })
    }
}

controller.list = async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit): 8;
    try {
        const data = await Product.find()
            .populate('category')
            .sort([[sortBy, order]])
            .limit(limit)
            .exec(); 
        return res.send(data)        
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucun produits trouvés'
        })
    }    
}

controller.decreaseQuantity = async (req, res, next) => {
    try {
        let bulkOps = await req.body.order.products.map((item) => {
            return {
                updateOne: {
                    filter: {_id: item._id},
                    update: { $inc: { quantity: -item.count, sold: +item.count } }
                }
            }   
        });
        await Product.bulkWrite(bulkOps, {})
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: 'Mis à jour du produit impossible'
        })
    }
};

module.exports = controller;