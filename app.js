const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const myErrorLogger = require('./src/utilities/ErrorLogger');
const myRequestLogger = require('./src/utilities/RequestLogger');
const userRouter = require('./src/routes/userRouter');
const DestinationRouter = require('./src/routes/DestinationRouter');
const BookingRouter = require('./src/routes/BookingRouter');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000

app.use(myRequestLogger);

app.get('/',(req,res)=>{
    res.send("Welcome to Tripify webservice added for testing")
})
app.use('/user', userRouter);
app.use('/package', DestinationRouter);
app.use('/book', BookingRouter);

app.use(myErrorLogger);
app.listen(PORT,()=>{
    console.log(`Listening on ${ PORT }`);
});


module.exports = app;