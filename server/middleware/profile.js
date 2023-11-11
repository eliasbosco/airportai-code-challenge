/**
 * Basic Authentication
 */
'use strict';

const { logger,
    getCatchErrorMessage,
} = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);

const ACCEPTED_PROFILES = ['agent', 'user'];

const profile = async (req, res, next) => {
    try {
        console.info(`Starting ${currentScriptName} -> profile()`);
        if (
            !req.headers?.authorization ||
            !ACCEPTED_PROFILES.includes(req.headers?.authorization)
        ) {
            throw Error('Unauthorized');
        }
        global.profile = req.headers.authorization;
        next();
    } catch (e) {
        e.status = 401;
        getCatchErrorMessage(e, res);
        return res.end();
    } finally {
        console.info(`Finishing ${currentScriptName} -> profile()`);
    }
};

module.exports = profile;