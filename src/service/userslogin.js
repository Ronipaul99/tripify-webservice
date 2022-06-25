const userDB = require('../model/userslogin');

const userService = {}

//login a user
userService.login = (contactNo, userPassword) => {
    return userDB.checkUser(contactNo).then((user) => {
        if (user == null) {
            let err = new Error("Enter registered contact number! If not registered, please register")
            err.status = 404
            throw err
        }
        else {
            return userDB.getPassword(contactNo).then((password) => {
                if (password != userPassword) {
                    let err = new Error("Incorrect password")
                    err.status = 406
                    throw err
                }
                else {
                    return user;
                }
            })
        }
    })
}
userService.registerUser= (user) =>{
   return userDB.findUserWithEmail(user.emailId).then((userreport)=>{
       if(userreport == null){
             return userDB.findUserWithPh(user.contactNo).then((data)=>{
                 if(data == null){
                     return userDB.generateUserId().then((userID)=>{
                         user.userId=userID;
                         return userDB.RegisterUser(user).then((userdata)=>{
                            if(userdata != null){
                                return userdata.userId
                            }else{
                                err= new Error("user cant registered error occured")
                                err.status=406;
                                throw err;
                            }
                        })
                     })
                 }else{
                    err = new Error("User with this phoneNo already exist");
                    err.status=502;
                    throw err;
                 }
             })
       }else{
             err = new Error("User with this EmailId already exist");
             err.status=502;
             throw err;
       }
   })
}

userService.getbookingsByUser = (userId) =>{
    return userDB.getUserWithId(userId).then((bookings)=>{
         if(bookings != null){
             return bookings
         }else{
             err = new Error("No bookings Found")
             err.status=502;
             throw err
         }
    })
}

module.exports = userService
    