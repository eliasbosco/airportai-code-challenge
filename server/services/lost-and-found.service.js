/**
 * The idea is to prototype a Lost and Found system for an airport to be used as a REST API,
 * where we can manage and search for lost products. An agent at the airport is able to 
 * list / create and delete products from the system, while a passenger is able to report 
 * his loss (e.g. by describing the product). A list of rough steps in priority order:
 * -> As an agent, list/create/delete products;
 * -> As a user, search for a product by keywords (e.g. type of product, brand, color, etc) 
 *    and lost time (e.g. "2023-01-01T10:30:00Z");
 * -> Extend the search endpoint to use a message instead of keywords 
 *    (e.g. 'I lost my Samsung S4 phone'). The lost time should still be a different input, 
 *    no need to parse from the message;
 */
'use strict';

const { logger } = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);

const productRepository = require('../repositories/product.repository');

class LostAndFound {
    static factory(req) {
        this.query = req?.query;
        this.params = req?.params;
        this.body = req?.body;
        return this;
    }

    static async listAll() {
        try {
            console.info(`Starting ${currentScriptName} -> LostAndFound.listAll()`);
            const result = await productRepository.list({
                limit: parseInt(LostAndFound.query?.limit) || 100,
            });

            if (!result || !result.length) {
                const err = new Error('No such record');
                err.status = 404;
                throw err;
            }

            return result;

        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            console.info(`Finishing ${currentScriptName} -> LostAndFound.listAll()`);
        }
    }

    static async create() {
        try {
            console.info(`Starting ${currentScriptName} -> LostAndFound.create()`);
            return await productRepository.create(LostAndFound.body);
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            console.info(`Finishing ${currentScriptName} -> LostAndFound.create()`);
        }
    }

    static async update() {
        try {
            console.info(`Starting ${currentScriptName} -> LostAndFound.update()`);
            return await productRepository.update(LostAndFound.params?.id, LostAndFound.body);
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            console.info(`Finishing ${currentScriptName} -> LostAndFound.update()`);
        }
    }

    static async delete() {
        try {
            console.info(`Starting ${currentScriptName} -> LostAndFound.delete()`);
            return await productRepository.deleteOne(LostAndFound.params?.id);
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            console.info(`Finishing ${currentScriptName} -> LostAndFound.delete()`);
        }
    }
}

module.exports = LostAndFound;