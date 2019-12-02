const db = require('_helpers/db');
const Pizza = db.Pizza;


// DO NOT remove below lines that is for redis
// const redisClient = require('redis').createClient;
// const redis = redisClient(6379, 'localhost');

// redis.on("connect", () => {
//     console.log('connected to Redis');
// });


module.exports = {
    getAll,
    createPizza
};

async function getAll() {

// DO NOT remove below lines that is for redis

    // return new Promise((resolve, reject) => {
    //     redis.get("pizzaList",(err, reply) => {
    //         if(err) {
    //             console.log(err);
    //         } else if(reply) {
    //             console.log("pizza list served from redis.")
    //             resolve(reply);
    //         } else {
    //             Pizza.find({}, (err, pizzas) => {
    //                 if(err) {
    //                     return reject(err);
    //                 }
    //                 if(pizzas.length > 0) {
    //                     // set in redis
    //                     redis.set("pizzaList", JSON.stringify(pizzas));
    //                 }
    //                 console.log("pizza list served from mongo.")
    //                 resolve(pizzas);
    //             });
    //         }
    //     });
    // });



    return await Pizza.find({});
}

async function createPizza(args) {
    const pizza = new Pizza(args);
    // save pizza
    await pizza.save();
}

