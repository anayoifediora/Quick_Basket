const db = require('../config/connection');
const { User, Product } = require('../models');

const userSeeds = require('./userSeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Product.deleteMany({});

        await User.create(userSeeds);
        await Product.create(productSeeds);

        console.log('completed!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});