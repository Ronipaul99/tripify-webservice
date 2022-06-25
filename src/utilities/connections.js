const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb+srv://use123:83ir3LoHs8ONdDsZ@cluster0.bsmu5.mongodb.net/?retryWrites=true&w=majority";

const DestinationSchema = Schema({
    destinationId :{type:String},
    continent:{type : String},
    imageUrl:{type : String},
    name :{type:String},
    details : {
        about : {type:String},
        itinerary : {
            dayWiseDetails:{
                firstDay:{type:String},
                restDaysSightSeeing:[{type:String}],
                lastDay:{type:String}
            },
            packageInclusions : [{type:String}],
            tourHighlights : [{type:String}],
            tourPace : [{type:String}]
        }
    },
    noOfNights :{type:Number},
    flightCharges:{type:Number},
    chargesPerPerson : {type:Number},
    discount : {type:Number},
    availability:{type:Number},
},{collection : "Destination"})

const bookingSchema = Schema({
    bookingId:String,
    userId:String,
    destId:String,
    destinationName:String,
    checkInDate:String,
    checkOutDate:String,
    noOfPersons:Number ,
    totalCharges:Number,
    timeStamp:String
},{ collection: "Booking" })


const userSchema = Schema({
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: { type: [String], default: [] }
}, { collection: "User" })

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('User', userSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
collection.getDestinationCollection = () =>{
    return Mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true}).then((database) => {
        return database.model('Destination', DestinationSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getBookingColection = () =>{
    return Mongoose.connect(url , {useNewUrlParser: true }).then((database)=>{
        return database.model('Booking' , bookingSchema)
    }).catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;
