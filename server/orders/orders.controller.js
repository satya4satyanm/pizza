const express = require('express');
const router = express.Router();
const orderService = require('./order.service');

// routes
router.post('/placeOrder', placeOrder); // user places order
router.get('/getOrders', getOrders); // this is for admin to see the orders

module.exports = router;

function placeOrder(req, res, next) {
    orderService.placeOrder(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getOrders(req, res, next) {
    orderService.getOrders()
        .then(orders => res.json(orders))
        .catch(err => next(err));
}
