const destinationDB = require('../model/destinations');


const destinationService={}

destinationService.getAllDestination = () =>{
    return destinationDB.getAllDestinations().then((destinations)=>{
        if(destinations!= null){
            return destinations
        }else{
            err = new Error("No destination Found");
            err.status=406;
            throw err;
        }
    })
}

destinationService.getDestinationByContinent = (continent) =>{
    return destinationDB.getDestinationByContinent(continent).then((destination)=>{
        if(destination != null){
            return destination;
        }else{
            err = new Error("No destination Found");
            err.status=406;
            throw err;
        }
    })
}

destinationService.getDestiinationByName = (DestName) =>{
    return destinationDB.getDestinationByName(DestName).then((destination)=>{
        if(destination!= null){
             return destination
        }else{
            err = new Error("No destination Found");
            err.status=406;
            throw err;
        }
    })
}

destinationService.getHotDeals = () =>{
    return destinationDB.getHotDeals().then((hotDeals)=>{
        if(hotDeals != null){
            return hotDeals
        }else{
            err = new Error("No Hot Deals Found");
            err.status=406;
            throw err;
        }
    })
}
destinationService.getDestinationByID = (destID) =>{
    return destinationDB.getDestinationByID(destID).then((destination)=>{
        if(destination!=null){
            return destination;
        }else{
            err = new Error("Destination not found");
            err.status=404;
            throw err;
        }
    })
}
module.exports = destinationService;

// destinationService.getDestiinationByName("Europe").then((data)=>{
//     console.log(data);
    
// })