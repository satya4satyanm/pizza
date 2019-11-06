const db = require('_helpers/db');
const Order = db.Order;

module.exports = {
    placeOrder,
    getOrders
};


async function placeOrder(orderParam) {
    const order = new Order(orderParam);
    await order.save();
}

async function getOrders() {
    return await Order.find({});
}
