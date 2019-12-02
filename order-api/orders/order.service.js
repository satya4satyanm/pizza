const db = require('_helpers/db');
const Order = db.Order;

module.exports = {
    placeOrder,
    getOrders,
    removeOrder
};


async function placeOrder(orderParam) {
    orderParam.orderId = Math.ceil(Math.random()*5000).toString();
    const order = new Order(orderParam);
    await order.save();

    return {data: "DB Updated" };
}

async function getOrders() {
    return await Order.find({});
}

async function removeOrder(oid) {
    return await Order.deleteOne({"orderId": oid }, function(err) {
        if (err) {
            message.type = 'error';
        }
    });
}
