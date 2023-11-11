/**
* Setup MongoDB.
*/
'use strict';

const { logger } = require('../helpers/logger');

const path = require('path');
const currentScriptName = path.basename(__filename);

let mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/AirportAI';
const MAX_RECONNECT = 20;
let ATTEMPTS_RECONNECT = 0;

/**
* Sets up MongoDB connection.
*/
function setup() {

  mongoose.connection.on('connected', () => console.info('MongoDB connected to database.'));
  mongoose.connection.on('open', () => console.info('MongoDB connection opened!'));
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error! Disconnecting...');
    mongoose.disconnect();
  });
  mongoose.connection.on('disconnected', async () => {
    console.error('MongoDB disconnected! Attempting to reconnect...');
    if (ATTEMPTS_RECONNECT < MAX_RECONNECT) {
      ATTEMPTS_RECONNECT++;
      connectToDb();
    } else {
      process.exit(1);
    }
  });
  mongoose.connection.on('reconnected', () => console.info('MongoDB reconnected!'));
  mongoose.connection.on('close', () => console.info('MongoDB closed!'));

  return connectToDb();
};


/**
* Connects to the database.
*/
const connectToDb = () => {

  // Mongoose connection options.
  const mongoConnectOpts = {
    sslValidate: true,
    checkServerIdentity: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
    ha: true, // Make sure the high availability checks are on
    haInterval: 10000, // Run every 10 seconds
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  // Connect and return promise.
  mongoose.connect(DATABASE_URL, mongoConnectOpts);
};

module.exports = {
  setup,
};