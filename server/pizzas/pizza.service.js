const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Pizza = db.Pizza;

module.exports = {
    getAll
};

async function getAll() {
    return await Pizza.find({});
}
