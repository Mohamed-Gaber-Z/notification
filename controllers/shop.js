const mongoose = require('mongoose');

const Shop = require('../models/shop');

exports.shopPost = async (req, res, next) => {
  try{
    let shop  = await Shop.create({
      name: 'flower shop',
      descr: 'good flowers'
    });
    res.status(200).send(shop);
  }catch(err){
    console.log(err);
    next(err);
  }
};
