var mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/AirportAI';
// mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
require('../setup/mongoose').setup();

const Product = require('../models');

const products = [   
    new Product({
        name: 'Samsung S4',
        details: `Colorful cover with a little mark on top right edge`,
        type: 'Phone',
        brand: 'Samsung',
        color: 'White',
    }),
    new Product({
        name: 'iPhone',
        details: `A little scratch on screen bottom left corner`,
        type: 'Phone',
        brand: 'Apple',
        color: 'Silver',
    }),
    new Product({
        name: 'Yamaha Acoustic Guitar',
        details: `Classic color with light color wood on top and dark brown wood on back, arm and headstock; Serial number ABC123`,
        type: 'Acoustic Guitar',
        brand: 'Yamaha',
        color: 'Woody',
    }),
    new Product({
        name: 'Samsonite baggage',
        details: `Big Samsonite bag, with wheels, type hardcase all in black, some marks on top`,
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
