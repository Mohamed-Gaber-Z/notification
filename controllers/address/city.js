const mongoose = require('mongoose');

const City = require('../../models/address/city');
const {cityValidation} = require('../../validation/address/city');

exports.cityPost = async (req, res, next) => {
  const {error} = cityValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  try{
    const city = new City({
      city: req.body.city
    });
    await city.save();
    res.status(200).send(city);
  } catch(e) {
    console.log(e);
    next(e);
  }

};

exports.cityGetAll = async (req, res, next) => {
  try{
    const city = await City.find();
    res.status(200).send(city);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.cityGetById = async (req, res, next) => {
  try{
    const id = req.params.id;
    const city = await City.findById(id);
    res.status(200).send(city);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.cityDelete = async (req, res, next) => {
  try{
    const id = req.params.id;
    const city = await City.findByIdAndDelete(id);
    res.status(200).send(city);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.cityUpdate = async (req, res, next) => {
  try{
    const id = req.params.id;
    const city = await City.findByIdAndUpdate(id, {$set: {
      city: req.body.city
    }});
    res.status(200).send(city);
  } catch(e) {
    console.log(e);
    next(e);
  }
};
