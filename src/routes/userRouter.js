const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')
const User = require('../model/beanClasses/users')
const destinationService = require('../service/destinations')


router.get("/setup", (req, res, next) => {
    setupUser.userSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})
//{ userId: "U1001", name: "abc", emailId: "abc@gmail.com", contactNo: 9098765432,
// password:"Abc@1234", bookings: ["B1001", "B1002"] },
//router to login
router.post('/login', function (req, res, next) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login(parseInt(contactNo), password).then(function (userDetails) {
        res.json(userDetails);
    }).catch(err => next(err));
})
router.post('/register',(req,res,next)=>{
   const user = new User(req.body);
    userservice.registerUser(user).then((userid)=>{
        if(userid){
            res.json({"message":"Registir Successfully with userID: " +userid})
        }
    }).catch((err)=>{
        next(err)
    })
})
router.get('/getBookings/:userId',(req,res,next)=>{
    const userId= req.params.userId
    userservice.getbookingsByUser(userId).then((bookings)=>{
        if(bookings){
            res.json(bookings)
        }
    }).catch((err)=>{
        next(err);
    })
})




module.exports = router;

