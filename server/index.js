const express = require('express')
const fetch = require("node-fetch")
const app = express()
const port = 3000

app.get('/', (req, res) => {

    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{ hello }"})
      })
        .then(r => r.json())
        .then(data => res.send('data returned:', data));

    //res.send('Hello World!')
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))