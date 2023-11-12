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

        // Sanatize limit in case more than 200 records is requested
        this.limit = parseInt(this.query?.limit);
        this.limit = this.limit > 200 ? 200 : this.limit;
        this.skip = this.query?.skip ? parseInt(this.query?.skip) : 0;

        this.lostTime = this.query?.lostTime 
            ? {
                $gte: new Date(this.query.lostTime).toISOString(),
                $lt: this.query?.lostTimeEnd
                    ? `${this.query.lostTimeEnd}T23:59:59.999Z`
                    : `${this.query.lostTime}T23:59:59.999Z`,
            }
            : null;

        return this;
    }

    static async list() {
        try {
            console.info(`Starting ${currentScriptName} -> LostAndFound.listAll()`);

            const where = {};
            this.query?.name ? where.name = new RegExp(String(this.query?.name), 'i') : delete where?.name;
            this.query?.type ? where.type = new RegExp(String(this.query?.type), 'i') : delete where?.type;
            this.query?.brand ? where.brand = new RegExp(String(this.query?.brand), 'i') : delete where?.brand;
            this.query?.color ? where.color = new RegExp(String(this.query?.color), 'i') : delete where?.color;

            this.lostTime ? where.lostTime = this.lostTime : delete where.lostTime;

            const result = await productRepository.list({
                skip: this.skip,
                limit: this.limit,
                where,
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

    static async listTextSearch() {
        try {
            console.info(`Starting ${currentScriptName} -> LostAndFound.listAll()`);

            if (!this.query?.search) {
                const err = new Error('Search text is required');
                err.status = 500;
                throw err;
            }

            const where = {
                '$text': {
                    '$search': String(this.query.search),
                },
            };

            this.lostTime ? where.lostTime = this.lostTime : delete where?.lostTime;

            const result = await productRepository.list({
                skip: this.skip,
                limit: this.limit,
                where,
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

            const result = await productRepository.update(LostAndFound.params?.id, LostAndFound.body);

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