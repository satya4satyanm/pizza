﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const helmet = require('helmet');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
app.use(helmet());
app.disable('x-powered-by');

// api routes
app.use('/pizzas', require('./pizzas/pizzas.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4203;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


////////////////////////
// Secure the apis with below code
// GraphQL - Authenticating Client
// https://www.tutorialspoint.com/graphql/graphql_quick_guide.htm
//////////////////////////////
//const expressJwt = require('express-jwt'); //auth
//const jwt = require('jsonwebtoken'); //auth
//////////////////////////////


// Below code is used to create pizzas from graphql client from browser
// data is stored in mongo as well as in one .db file for quick access

const db = require('./graphql/data/db');

const fs = require('fs')
const typeDefs = fs.readFileSync('./graphql/schema.graphql',{encoding:'utf-8'})
const resolvers = require('./graphql/resolver')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

// http://localhost:4200/graphql?{"query":"mutation {\n  createPizza(name:\"p4\",description:\"Pizza 4\",type:\"Veg\",toppings:[\"t\",\"p\"],price:5)\n}","variables":null}