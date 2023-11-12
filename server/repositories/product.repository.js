'use strict';

const { logger } = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);

const mongoose = require('mongoose');
const Product = require('../models');

/**
 * List products
 * @param {any} params 
 * @returns {Array<mongoose.Model>}
 */
const list = async (params = {}) => {
    try {
        console.info(`Starting ${currentScriptName} -> list()`);
        return await Product
            .find(params?.where)
            .skip(params?.skip || 0)
            .limit(params?.limit || 200)
            .sort({ lostTime: -1 })
            .exec();
    } catch (err) {
        throw err;
    } finally {
        console.info(`Finishing ${currentScriptName} -> list()`);
    }
};

/**
 * Creates a new product
 * @param {mongoose.Model} data 
 * @returns {mongoose.Model}
 */
const create = async (data) => {
    try {
        console.info(`Starting ${currentScriptName} -> create()`);
        const product = new Product(data);
        return await product.save();
    } catch (err) {
        throw err;
    } finally {
        console.info(`Finishing ${currentScriptName} -> create()`);
    }
};

/**
 * Update an existing product by id
 * @param {number} id 
 * @param {mongoose.Model} data 
 * @returns {mongoose.Model}
 */
const update = async (id, data) => {
    try {
        console.info(`Starting ${currentScriptName} -> update()`);
        return await Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, data, { new: true });
    } catch (err) {
        throw err;
    } finally {
        console.info(`Finishing ${currentScriptName} -> update()`);
    }
};

/**
 * Remove an existing product by id
 * @param {number} id 
 * @returns {any}
 */
const deleteOne = async (id) => {
    try {
        console.info(`Starting ${currentScriptName} -> deleteOne()`);
        return await Product.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    } catch (err) {
        throw err;
    } finally {
        console.info(`Finishing ${currentScriptName} -> deleteOne()`);
    }
};

module.exports = {
    list,
    create,
    update,
    deleteOne,
};