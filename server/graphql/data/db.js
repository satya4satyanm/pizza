const { DataStore } = require('notarealdb');

const store = new DataStore('./graphql/data');

module.exports = {
   pizzas:store.collection('pizzas')
};