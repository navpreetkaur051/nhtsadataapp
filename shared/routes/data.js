const router = require("express").Router();
require("dotenv").config();
const request = require("request");

let urlGetAllManufacturers = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json";//&page=2";
let urlGetAllMakesgivenManufacturer = "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/";//honda?format=json";
let urlGetDetailsVehiclebasedonVIN = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/";//5UXWX7C5*BA?format=xml";

// for deploy
let path = "/";
if (process.env.NODE_ENV !== "production") {
  //for local setup
  path = "http://localhost:3000/#";
}

router.get("/getnhtsadataallmanufacturers/",(req, res) => {
     request(urlGetAllManufacturers, function(error,response,body){
        allVehicles_json = JSON.parse(body);
        res.send(allVehicles_json);
     })
  }
);
router.get("/getnhtsadataallmakes/:manufacturer",(req, res) => {
    var manufacturer = req.params.manufacturer;
    urlGetAllMakesgivenManufacturer = urlGetAllMakesgivenManufacturer.concat(manufacturer).concat('?format=json');
     request(urlGetAllMakesgivenManufacturer, function(error,response,body){
        allmakes_json = JSON.parse(body);
        res.send(allmakes_json);
     })
  }
);
router.get("/urlGetDetailsVehiclebasedonVIN/:vin",(req, res) => {
    var vehicleDet = req.params.vin;
    urlGetDetailsVehiclebasedonVIN = urlGetDetailsVehiclebasedonVIN.concat(vehicleDet).concat('?format=json');
     request(urlGetDetailsVehiclebasedonVIN, function(error,response,body){
        vehiclesvin_json = JSON.parse(body);
        res.send(vehiclesvin_json);
     })
  }
);


// 1.	Get a list of all manufacturers (e.g. Toyota, Honda, etc.)
// 2.	Get a list of all makes given a manufacturer (e.g. for Toyota: Corolla, Prius, etc.)
// 3.	Get the year, make, and model of a vehicle given its VIN (e.g. for 3N1AB6AP7BL729215: 2011 Nissan Sentra)


module.exports = router;
