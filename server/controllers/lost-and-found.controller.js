'use strict';

const { logger,
    getCatchErrorMessage,
} = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);;

const LostAndFound = require('../services/lost-and-found.service');

const {
    checkAuthorization,
} = require('../helpers/authorization');

const AGENT_PERMISSION = ['agent'];
const ALL_PERMISSION = ['agent', 'user'];

/**
 * List all products, limit is optional
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const list = async (req, res) => {
    try {
        console.info(`Starting ${currentScriptName} -> list()`);
        // Permission
        checkAuthorization(ALL_PERMISSION, res);
        const result = await LostAndFound.factory(req).list();

        res.send(result);
    } catch (err) {
        getCatchErrorMessage(err, res);
    } finally {
        res.end();
        console.info(`Finishing ${currentScriptName} -> list()`);
    }
};

/**
 * List all products, limit is optional
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const listTextSearch = async (req, res) => {
    try {
        console.info(`Starting ${currentScriptName} -> list()`);
        // Permission
        checkAuthorization(ALL_PERMISSION, res);
        const result = await LostAndFound.factory(req).listTextSearch();

        res.send(result);
    } catch (err) {
        getCatchErrorMessage(err, res);
    } finally {
        res.end();
        console.info(`Finishing ${currentScriptName} -> list()`);
    }
};

/**
 * Create a new product
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const create = async (req, res) => {
    try {
        console.info(`Starting ${currentScriptName} -> create()`);
        checkAuthorization(AGENT_PERMISSION, res);

        res.send(await LostAndFound.factory(req).create());
    } catch (err) {
        getCatchErrorMessage(err, res);
    } finally {
        res.end();
        console.info(`Finishing ${currentScriptName} -> create()`);
    }
};

/**
 * Update an existing product
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const update = async (req, res) => {
    try {
        console.info(`Starting ${currentScriptName} -> update()`);
        checkAuthorization(AGENT_PERMISSION, res);

        res.send(await LostAndFound.factory(req).update());
    } catch (err) {
        getCatchErrorMessage(err, res);
    } finally {
        res.end();
        console.info(`Finishing ${currentScriptName} -> update()`);
    }
};

/**
 * Delete an existing product
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const deleteOne = async (req, res) => {
    try {
        console.info(`Starting ${currentScriptName} -> deleteOne()`);
        checkAuthorization(AGENT_PERMISSION, res);

        res.send(await LostAndFound.factory(req).delete());
    } catch (err) {
        getCatchErrorMessage(err, res);
    } finally {
        res.end();
        console.info(`Finishing ${currentScriptName} -> deleteOne()`);
    }
};

module.exports = {
    list,
    listTextSearch,
    create,
    update,
    deleteOne,
};