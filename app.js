const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.send("Welcome to Tripify webservice ")
})
app.listen(PORT,()=>{
    console.log(`Listening on ${ PORT }`);
});


module.exports = app;