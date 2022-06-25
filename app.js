const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Welcome to Tripify webservice ")
})
app.listen(3000);
console.log("Server listening in port 3000 ");

module.exports = app;