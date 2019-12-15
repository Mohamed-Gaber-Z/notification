const mongoose = require('mongoose');

const User = require('../models/user');

exports.thenearest = async (req, res, next) => {
  try{
    let lat = -122.1864;
    let lon = 37.4396;
    const thenearest = await User.find({location: {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: "Point",
          coordinates: [lat, lon]
        }
      }
    }});
    res.status(200).send(thenearest);
  } catch(e) {
    console.log(e);
    next(e);
  }
};
