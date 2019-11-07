const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    orderId: { type: String },
    username: { type: String, required: true },
    address: { type: Object },
    createdDate: { type: Date, default: Date.now },
    items: { type: [String], default: [] },
    delivered: { type: Boolean }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);