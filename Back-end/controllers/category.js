const express = require('express')
const controller = express.Router()

const Category = require('../models/category')
const Product = require('../models/product')

controller.getById = async (req, res, next,id) => {
    try {
        const category = await Category.findById(id).exec();
        if(!category) {
            return res.status(400).json({
                error: 'Aucune catégories trouvée'
            })
        }
        req.category = category;
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucune catégories trouvée'
        })
    }      
}

controller.read = async (req, res) => {
    const category = req.category
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit): 8;
    try {
        const data = await Product.find({ category: category })
            .populate('category', '_id')
            .sort([[sortBy, order]])
            .limit(limit)
            .exec();
        return res.json({ category: category, product: data });
    }
    catch (err) {
        return res.status(400).json({
            error: 'Catégorie non trouvé'
        }) 
    }
};

controller.create = async (req, res) => {
    const category = new Category(req.body)
    try {
        const data = await category.save();
        return res.json({data}); 
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucune catégories'
        })   
    }
}

controller.remove = async (req, res) => {
    const category = req.category
    try {
        await category.remove()
        return res.json({ 
            message: "La catégorie a bien été supprimé"
        }); 
    }
    catch (err) {
        return res.status(400).json({
            error: "Suppression échoué"
        })   
    }
}

controller.list = async (req, res) => {
    try {
        const data  = await Category.find().exec()
        return res.json(data)
    }
    catch (err) {
        return res.status(400).json({
            error: 'Aucune catégorie trouvée'
        })   
    }  
}

module.exports = controller;