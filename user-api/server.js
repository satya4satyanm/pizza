require('rootpath')();
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
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4201;
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