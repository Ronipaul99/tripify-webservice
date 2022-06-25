const express = require('express');
const router = express.Router();
const destinationService = require('../service/destinations')


router.get('/destinations',(req,res,next)=>{
    destinationService.getAllDestination().then((destinations)=>{
        if(destinations){
            res.json(destinations)
        }
    }).catch((err)=>{
        next(err);
    })
})

router.get('/hotDeals',(req,res,next)=>{
    destinationService.getHotDeals().then((hotDeals)=>{
        if(hotDeals){
            res.json(hotDeals)
        }
    }).catch((err)=>{
        next(err)
    })
})

router.get('/destinations/:DestName',(req,res,next)=>{
    const destinationName = req.params.DestName;
    destinationService.getDestiinationByName(destinationName).then((destinationdata)=>{
        if(destinationdata){
            res.json(destinationdata)
        }
    }).catch((err)=>{
        next(err);
    })
})
router.get('/continent/:contName',(req,res,next)=>{
    const continent = req.params.contName;
    destinationService.getDestinationByContinent(continent).then((continentData)=>{
        if(continentData){
            res.json(continentData)
        }
    }).catch((err)=>{
        next(err);
    })
})
router.get('/destinationsid/:id',(req,res,next)=>{
    const destId= req.params.id;
    destinationService.getDestinationByID(destId).then((destinstion)=>{
        res.json(destinstion)
    }).catch((err)=>{
        next(err);
    })
})
module.exports = router;

