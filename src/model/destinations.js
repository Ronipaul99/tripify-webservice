const connection = require("../utilities/connections");

const destinationDB = []

destinationDB.getAllDestinations = () =>{
    return connection.getDestinationCollection().then((destinationModel)=>{
         return destinationModel.find({}).then((destinationdata)=>{
             if(destinationdata){
                 return destinationdata;
             }else{
                 return null;
             }
         })
    })
}

destinationDB.getDestinationByID = (destinationId) => {
     return connection.getDestinationCollection().then((destinationModel)=>{
         return destinationModel.findOne({destinationId : destinationId}).then((destination)=>{
             if(destination){
                 return destination;
             }else{
                 return null;
             }
         })
     })
}
destinationDB.getDestinationByName = (destinations) =>{
    let dest = destinations[0].toUpperCase() + destinations.slice(1)
    let mergedArray = []
    return connection.getDestinationCollection().then((collection) => {
        return collection
            .find({
                $or: [
                    {"continent": { $regex: dest } },
                    {"name": { $regex: dest } },
                    { "details.itinerary.dayWiseDetails.restDaysSightSeeing": 
                        { $regex: dest } },
                    { "details.about": { $regex: dest } }
                ]
            })
            .then((destination) => {
                
                if (destination) { 
                   
                                destination.map((dest) => {
                                    mergedArray.push(dest)
                                })
                                return mergedArray;
                            }else return null;
            })
    })
}

// destinationDB.getDestinationByName = (destinationname) =>{
//     return connection.getDestinationCollection().then((destinationModel)=>{
//         return destinationModel.find({},{_id : 0,  name : 1 , destinationId : 1}).then((destinationdata)=>{
//             if(destinationdata){
//                 let destinationName=[];
//                 destinationdata.forEach((item , index)=>{
//                      destinationName.push(item.name.toLowerCase())
//                 })
//                  let destinationNameIn = destinationname.toLowerCase();
//                   let dest=null;
//                    destinationName.forEach((item,index)=>{
//                         let found=item.indexOf(destinationNameIn)
//                          if(found !== -1){
//                          dest = index;
//                     }
//                 })
//                 if(dest != null){
//                     return destinationdata[dest].destinationId;
//                 }else{
//                     return dest;
//                 }
            
//         }else{
//             return null
//         }
//         })
//    })
// }

destinationDB.getDestinationByContinent = (continent) =>{
    return connection.getDestinationCollection().then((destinationModel)=>{
        return destinationModel.find({continent : continent}).then((destinationData)=>{
            if(destinationData.length>0){
                return destinationData
            }else{
                return null
            }
        })
    })
}

destinationDB.getHotDeals = () =>{
    return connection.getDestinationCollection().then((destinationModel)=>{
        return destinationModel.find({discount : {$gt : 0}}).then((hotdeals)=>{
            if(hotdeals.length > 0){
                return hotdeals
            }else{
                return null;
            }
        })
    })
}

module.exports = destinationDB;


// destinationDB.getDestinationByName("Europe").then((data)=>{
//   console.log(data);
  
// })