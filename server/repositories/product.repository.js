'use strict';

const { logger } = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);

const mongoose = require('mongoose');
const Product = require('../models');

/**
 * List products
 * @param {*} params 
 * @returns 
 */
const list = async (params = {}) => {
    try {
        console.info(`Starting ${currentScriptName} -> list()`);
        return await Product
            .find({})
            .limit(params?.limit || 100)
            .sort({ lostTime: -1 })
            .exec();
    } catch (err) {
        throw err;
    } finally {
        console.info(`Finishing ${currentScriptName} -> list()`);
    }
};

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