const express = require('express')
const app = express()
const mongoose = require('mongoose');
const graphqlExpress = require("express-graphql");
const bookSchema = require('./graphql/BookSchema').BookSchema;
mongoose.connect('mongodb://mongo:27017/pizza', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
        throw err;
        console.log(err);
    } else {
        console.log('connected to mongo db successfully.')
    }
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'),  () =>{
    console.log("Node app is running at localhost:" + app.get('port'))
});


app.use('/graphql', graphqlExpress({
    schema: bookSchema,
    rootValue: global,
    graphiql: true
}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});