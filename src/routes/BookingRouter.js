const express = require('express');
const router = express.Router();
const bookingService = require('../service/BookingControle')
const Booking = require('../model/beanClasses/Booking')

router.post('/:userId/:destinationId',(req,res,next)=>{
    let booking= new Booking(req.body);
    const userId= req.params.userId;
    const destinationId = req.params.destinationId;
    booking.userId=userId;
    booking.destId=destinationId;
    booking.timeStamp=new Date().getTime().toString();
    bookingService.book(booking).then((bookingData)=>{
        if(bookingData){
            res.json(bookingData)
        }
    }).catch((err)=>{
        next(err);
    })

})


router.delete('/cancelBooking/:bookingId',(req,res,next)=>{
    const bookingId= req.params.bookingId;
    bookingService.cancelBooking(bookingId).then((bookingId)=>{
        if(bookingId){
            res.json({"message":`${bookingId} successfully Cancled`})
        } 
    }).catch((err)=>{
        next(err);
    })
})


router.get('/getDetails/:userId/:destinationId',(req,res,next)=>{
   const userId= req.params.userId;
   const destinationId= req.params.destinationId;
   bookingService.getBookingByUserAndDestination(userId,destinationId).then((bookings)=>{
       if(bookings){
           res.json(bookings)
       }
   }).catch((err)=>{next(err)})
})

router.get('/getDetails/:userId',(req,res,next)=>{
    const userId= req.params.userId;
    bookingService.getBookingByUser(userId).then((bookings)=>{
        if(bookings){
            res.json(bookings)
        }
    }).catch((err)=>{next(err)})
})
module.exports = router;