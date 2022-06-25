const bookingDB = require('../model/BookingControle');
const destinationDB =require('../model/destinations')
const userDB = require('../model/userslogin')
const bookingService = {}

bookingService.book = (booking) => {
    return bookingDB.generateBookingID().then((bookingId)=>{
        booking.bookingId=bookingId;
        return userDB.updateBooking(booking.userId , booking.bookingId).then((updatedData)=>{
             if(updatedData!=null){
                return destinationDB.getDestinationByID(booking.destId).then((destination)=>{
                    if(destination){
                        booking.destinationName=destination.name;
                        let totalCharges=destination.chargesPerPerson * booking.noOfPersons;
                        totalCharges= totalCharges-((totalCharges*destination.discount)/100);
                        booking.totalCharges=totalCharges;
                        
                        return bookingDB.book(booking).then((responseData)=>{
                            if(responseData != null){
                                 return responseData
                            }else{
                                let err = new Error("booking canceled");
                                 err.status = 502;
                                 throw err;
                            }
                        })
                    }else{
                        let err = new Error("booking canceled due to "+destination);
                        err.status = 502;
                        throw err;
                    }
                })
             }else{
                let err = new Error("booking canceled due to"+updatedData+" not found");
                err.status = 502;
                throw err;
             }
        })
    
    })
}
/*
 
 */  

bookingService.cancelBooking = (bookingId) => {
   
     return bookingDB.getBookigById(bookingId).then((bookingdata)=>{
        if(bookingdata!=null){
           const userID=bookingdata[0].userId;
            return bookingDB.cancelBooking(bookingId).then((booking)=>{
                 if(booking.deletedCount==1){
                    return userDB.deleteBooking(userID ,bookingId).then((bookingid)=>{
                        if(bookingid.nModified==1){
                            return bookingId
                        }else{ 
                            let err = new Error("booking not found");
                            err.status = 501;
                            throw err;
                        }
                    })
                 }else{
                     let err = new Error("booking can't cancele");
                     err.status = 502;
                     throw err;
                 }
           })
        }else{
           let err = new Error("booking can't cancele");
           err.status = 503;
           throw err;
        }
    })
}

bookingService.getBookingByUserAndDestination = (userId , destId) => {
     return bookingDB.getBookingByUserAndDestination(userId , destId).then((booking)=>{
        if(booking != null){
            return booking;
        }else{
           let err = new Error("booking not available with this userID:" +userId);
           err.status = 502;
           throw err;
        }
    })
}

bookingService.getBookingByUser = (userId) => {
     return bookingDB.getBookingByUser(userId).then((booking)=>{
        if(booking != null){
            return booking;
        }else{
           let err = new Error("booking not available with this userID:" +userId);
           err.status = 502;
           throw err;
        }
    })
}



module.exports=bookingService;