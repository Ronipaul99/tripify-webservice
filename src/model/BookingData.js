const bookingData=[
    {
        bookingId:"B1001",
        userId:"U1001",
        destId:"D1001",
        destinationName:"A Week in Greece: Athens, Mykonos & Santorini",
         checkInDate:"2018-12-09",
        checkOutDate:"2018-12-16",
        noOfPersons:2 ,
         totalCharges:5998,
         timeStamp:new Date().getTime().toString()
},
{
    bookingId:"B1002",
    userId:"U1001",
    destId:"D1002",
    destinationName:"Romantic Europe: Paris, Venice & Vienna",
    checkInDate:"2019-1-10",
    checkOutDate:"2019-1-24",
     noOfPersons:1 ,
    totalCharges:4549,
    timeStamp:new Date().getTime().toString()
},
{
    bookingId:"B1003",
    userId:"U1002",
    destId:"D1002",
    destinationName:"Romantic Europe: Paris, Venice & Vienna",
    checkInDate:"2019-1-10",
    checkOutDate:"2019-1-24",
    noOfPersons:1 ,
    totalCharges:4549,
    timeStamp:new Date().getTime().toString()
}
]

module.exports=bookingData;