/**
* DB models.
*/
'use strict';

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    details: String,
    type: String,
    brand: String,
    color: String,
    lostTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('product', ProductSchema);