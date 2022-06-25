const connection = require("../utilities/connections")
const destinationData = require('./dummydata')
const bookingData =require('./BookingData')
let userData = [
    { userId: "U1001",
     name: "abc",
      emailId: "abc@gmail.com",
       contactNo: 9098765432,
        password: "Abc@1234",
         bookings: [ "B1001", "B1002"] 
        },
        { userId: "U1002",
          name: "def", 
          emailId: "def@gmail.com", 
          contactNo: 6234567890, 
          password: "Def@1234", 
          bookings: ["B1003"] 
        }
]


exports.userSetup = () => {
    return connection.getUserCollection().then((myCollection) => {
        return myCollection.deleteMany().then(() => {
            return myCollection.insertMany(userData).then((res) => {
                return connection.getDestinationCollection().then((destinationCollection) => {
                    return destinationCollection.deleteMany().then(()=>{
                         return destinationCollection.insertMany(destinationData).then(()=>{  
                             return connection.getBookingColection().then((BookingCollection)=>{
                                return BookingCollection.deleteMany().then(()=>{
                                    return BookingCollection.insertMany(bookingData).then((data)=>{
                                        if (data) {
                                            return "Insertion Successfull"
                                        } else {
                                            throw new Error("Insertion failed")
                                        }
                                     })
                                 })
                             })  
                            
                        })
                    })
                })
            })
        })

    })
}