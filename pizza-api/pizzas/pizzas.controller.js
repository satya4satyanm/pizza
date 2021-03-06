﻿const express = require('express');
const router = express.Router();
const pizzaService = require('./pizza.service');

// routes
router.get('/getAllPizzas', getAll);

module.exports = router;

function getAll(req, res, next) {
    pizzaService.getAll()
        .then(pizzas => {
            if(typeof pizzas === "string")
                pizzas = JSON.parse(pizzas);

            res.json(pizzas)
        })
        .catch(err => next(err));
}