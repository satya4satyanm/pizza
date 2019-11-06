const { DataStore } = require('notarealdb');

const store = new DataStore('./graphql/data');

module.exports = {
   students:store.collection('students'),
   colleges:store.collection('colleges')
};