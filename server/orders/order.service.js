const db = require('_helpers/db');
const Order = db.Order;

module.exports = {
    placeOrder,
    getOrders
};


async function placeOrder(orderParam) {
    orderParam.orderId = Math.ceil(Math.random()*5000).toString();
    const order = new Order(orderParam);
    await order.save();
}

async function getOrders() {
    return await Order.find({});
}
