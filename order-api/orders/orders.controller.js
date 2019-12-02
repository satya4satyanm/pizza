const express = require('express');
const router = express.Router();
const orderService = require('./order.service');

// routes
router.post('/placeOrder', placeOrder); // user places order
router.get('/getOrders', getOrders); // this is for admin to see the orders
router.post('/removeOrder', removeOrder); // this is for admin to remove the orders when delivered

module.exports = router;

function placeOrder(req, res, next) {
    orderService.placeOrder(req.body)
        .then(() => res.json({"data":"Order Placed Successfully!"}))
        .catch(err => next(err));
}

function getOrders(req, res, next) {
    orderService.getOrders()
        .then(orders => res.json(orders))
        .catch(err => next(err));
}

function removeOrder(req, res, next) {
    console.log(req.body.orderId)
    orderService.removeOrder(req.body.orderId)
        .then(orders => res.json({"data": "Order delivered and removed.", "success": 1}))
        .catch(err => next(err));
}
