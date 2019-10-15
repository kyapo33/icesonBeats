const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: true,
    },

    price : {
        type: Number,
        trim: true,
        required: true,
    },

    category : {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },

    iframe : {
        type: String,
        trim: true,
        required: true,
    },

    quantity : {
        type: Number
    },

    download : {
        type: String,
        trim: true,
        required: true,
    },

}, {timestamps : true});

module.exports = mongoose.model('Product', productSchema);