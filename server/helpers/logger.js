'use strict';

const { createLogger, transports } = require("winston");

// define the custom settings for each transport (file, console)
const options = {
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
    transports: [
        new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

const getCatchErrorMessage = (e, res) => {
    console.error(e);
    res.status(e?.status || 500).send({ message: e.message || `There's a unexpected error, please contact support` });
};

module.exports = {
    logger,
    getCatchErrorMessage,
};