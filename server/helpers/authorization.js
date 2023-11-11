'use strict';

const { logger,
    getCatchErrorMessage,
} = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);

/**
 * Check if logged in profile belongs to the rolesAccepted
 * @param {Array} acceptedProfiles
 */
const checkAuthorization = (acceptedProfiles, res) => {
    try {
        console.info(`Starting ${currentScriptName} -> checkAuthorization`);
        if (!acceptedProfiles.includes(global.profile)) {
            throw Error('Unauthorized');
        }
    } catch (e) {
        e.status = 401;
        getCatchErrorMessage(e, res);
    } finally {
        console.info(`Finishing ${currentScriptName} -> checkAuthorization`);
    }
};

module.exports = {
    checkAuthorization,
};