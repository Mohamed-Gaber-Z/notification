const nodeGeocoder = require('node-geocoder');

const options = {
  provider: 'opencage',
  apiKey: '1e821689397e4420a383de5fae96f78d',
};

const geocoder = nodeGeocoder(options);

 async function currentLocation (lat, lon, next) {
   try{
     const address = await  geocoder.reverse({lat: lat, lon: lon});
     console.log(address);
     return address;
 } catch (err) {
   console.log(err);
   next(err);
 }
};

exports.address = currentLocation;
