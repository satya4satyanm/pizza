const db = require('./data/db')
const pizzaService = require('../pizzas/pizza.service');


const Mutation = {
   createPizza:(root,args,context,info) => {


         // create mongo db entry for pizzas as well
         pizzaService.createPizza({
            name:args.name,
            description:args.description,
            type:args.type,
            toppings:args.toppings,
            price:args.price
      });



         return db.pizzas.create({
            name:args.name,
            description:args.description,
            type:args.type,
            toppings:args.toppings,
            price:args.price
      })
   }
}
const Query = {
   greeting:() => "hello"
}

module.exports = {Query,Mutation}