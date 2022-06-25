const connection = require("../utilities/connections")

const bookingDB = {}

bookingDB.generateBookingID = () =>{
    return connection.getBookingColection().then((model) => {
        return model.distinct("bookingId").then((ids) => {
            let latestID= parseInt(ids[ids.length-1].slice(1));
            latestID++;
            BookingID='B'+latestID;
            return BookingID
        })
    })
}

bookingDB.book = (booking) =>{
    return connection.getBookingColection().then((BookingDatabase)=>{
        return BookingDatabase.create(booking).then((data)=>{
            if(data){
                return data;
            }else{
                return null;
            }
        })
    })
}

bookingDB.cancelBooking = (bookingId) =>{
    return connection.getBookingColection().then((BookingDatabase)=>{
        return BookingDatabase.deleteOne({ bookingId : bookingId}).then((data)=>{
            if(data.deletedCount===1){
                return data;
            }else{
                return null;
            }
        })
    })
}

bookingDB.getBookingByUserAndDestination = (userId , destId) =>{
    return connection.getBookingColection().then((BookingDatabase)=>{
        return BookingDatabase.find({userId : userId}).then((bookings)=>{
            let bookingArray = [];
            bookings.forEach((item,index)=>{
                if(item.destId==destId){
                      bookingArray.push(item) 
                }
            })
          if(bookingArray.length>0){
              return bookingArray
          }else{
              return null
          }
        })
    })
}

bookingDB.getBookingByUser = (userId) =>{
    return connection.getBookingColection().then((BookingDatabase)=>{
        return BookingDatabase.find({userId : userId}).then((bookings)=>{
            if(bookings){
                return bookings;
            }else{
                return null;
            }
        })
    })
}

bookingDB.getBookigById = (bookingId) => {
    return connection.getBookingColection().then((BookingDatabase)=>{
        return BookingDatabase.find({bookingId : bookingId}).then((bookings)=>{
            if(bookings.length>0){
                return bookings;
            }else{
                return null;
            }
        })
    })
}

module.exports=bookingDB;

