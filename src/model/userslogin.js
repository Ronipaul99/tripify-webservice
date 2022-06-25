const userDetails = require('./beanClasses/users');
const connection = require("../utilities/connections")

const usersDB = {}

usersDB.generateUserId = () => {
    return connection.getUserCollection().then((model) => {
        return model.distinct("userId").then((ids) => {
            let latestID= parseInt(ids[ids.length-1].slice(1));
            latestID++;
            userID='U'+latestID;
            return userID
        })
    })
}


usersDB.checkUser = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.findOne({ "contactNo": contactNo }).then((customerContact) => {
            if (customerContact) {
                return new userDetails(customerContact);
            }
            else return null;
        })
    })
}

usersDB.getPassword = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.find({ "contactNo": contactNo }, { _id: 0, password: 1 }).then((password) => {
            if (password.length != 0)
                return password[0].password;
            else
                return null;
        })
    })
}
usersDB.findUserWithPh = (phoneNo) =>{
    return connection.getUserCollection().then((userDatabase)=>{
         return userDatabase.findOne({contactNo:phoneNo}).then((data)=>{
             if(data){
                 return data;
             }else{
                 return null
             }
         })
    })
}

usersDB.findUserWithEmail = (emailId) => {
    return connection.getUserCollection().then((userDatabase)=>{
        return userDatabase.findOne({emailId:emailId}).then((data)=>{
            if(data){
                return data;
            }else{
                return null
            }
        })
    })
}
usersDB.RegisterUser = (user) =>{
     return connection.getUserCollection().then((userDatabase)=>{
         return userDatabase.create(user).then((data)=>{
             if(data){
                 return data;
             }else{
                 return null;
             }
         })
     })
}


usersDB.getUserWithId = (userId) => {
    return connection.getUserCollection().then((userDatabase)=>{
        return userDatabase.findOne({userId:userId},{_id : 0 , bookings : 1}).then((bookings)=>{
            if(bookings){
                return bookings;
            }else{
                return null;
            }
        })
    })
}
usersDB.updateBooking = (userId,bookingId) =>{
    return connection.getUserCollection().then((userDatabase)=>{
        return userDatabase.updateOne({userId:userId},{$push : {bookings: bookingId}}).then((updatedData)=>{
            if(updatedData.nModified===1){
                return updatedData
            }else{
                return null;
            }
        })
    })
}
usersDB.deleteBooking = (userId,bookingId) =>{
    return connection.getUserCollection().then((userDatabase)=>{
        return userDatabase.updateOne({userId:userId},{$pull : {bookings: bookingId}}).then((updatedData)=>{
            if(updatedData.nModified===1){
                console.log(updatedData);
                return updatedData
            }else{
                return null;
            }
        })
    })
}
module.exports = usersDB;


// usersDB.deleteBooking("U1002","B1004").then((id)=>{
//     console.log(id);
    
// })