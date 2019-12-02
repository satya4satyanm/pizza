const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String },
    description: { type: String },
    type: { type: String },
    toppings: { type: [String], default: [] },
    price: { type: Number }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pizza', schema);