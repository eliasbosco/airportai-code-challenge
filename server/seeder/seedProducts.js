var mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/AirportAI';
// mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
require('../setup/mongoose').setup();

const Product = require('../models');

const products = [   
    new Product({
        name: 'Samsung S4',
        description: `I've lost my Samsung S4 likely close to terminal 2 gate 32`,
        type: 'Mobile',
        brand: 'Samsung',
        color: 'White',
    }),
    new Product({
        name: 'iPhone',
        description: `Last time I've used my iphone I was in the terminal 1 floor 3`,
        type: 'Mobile',
        brand: 'Apple',
        color: 'Silver',
    }),
    new Product({
        name: 'Yamaha Acoustic Guitar',
        description: `I don't remember when I saw my acoustic guitar last time`,
        type: 'Acoustic Guitar',
        brand: 'Yamaha',
        color: 'Woody',
    }),
    new Product({
        name: 'Samsonite baggage',
        description: `I've lost my samsonite black baggage close to the starbucks`,
        type: 'Baggage',
        brand: 'Samsonite',
        color: 'Black',
    }),
];

Product.insertMany(products)
    .then(() => {
        console.info("DONE!");
        mongoose.disconnect();
        process.exit(0);
    })
    .catch((err) => console.error);
