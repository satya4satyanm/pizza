const db = require('_helpers/db');
const Pizza = db.Pizza;

module.exports = {
    getAll,
    createPizza
};

async function getAll() {
    return await Pizza.find({});
}

async function createPizza(args) {
    const pizza = new Pizza(args);
    // save pizza
    await pizza.save();
}