const express = require('express')
const app = express()
const mongoose = require('mongoose');
const graphqlExpress = require("express-graphql");
const bookSchema = require('./graphql/BookSchema').BookSchema;
mongoose.connect('mongodb://mongo:27017/pizza', { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("connected to mongo");
})
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'),  () =>{
    console.log("Node app is running at localhost:" + app.get('port'))
});
app.use('/graphql', graphqlExpress({
    schema: bookSchema,
    rootValue: global,
    graphiql: true
}));