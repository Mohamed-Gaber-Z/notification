const mongoose = require('mongoose');

const Country = require('../../models/address/country');
const City = require('../../models/address/city')
const {countryValidation} = require('../../validation/address/country');

exports.countryPost = async (req, res, next) => {
  const {error} = countryValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const city = await City.findById(req.body.cityref);
  if(!city) return res.status(400).send('Invalid City')

  try{
    let country = new Country({
      country: req.body.country,
      cityref: req.body.cityref
    });
    await country.save();
    res.status(200).send(country);
  } catch(e) {
    console.log(e);
    next(e);
  }

};

exports.countryGetAll = async (req, res, next) => {
  try{
    const country = await Country.find().populate('cityref');
    res.status(200).send(country);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.countryGetById = async (req, res, next) => {
  try{
    const id = req.params.id
    const country = await Country.findById(id).populate('cityref');
    res.status(200).send(country)
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.countryDelete = async (req, res, next) => {
  try{
    const id = req.params.id;
    const country = await Country.findByIdAndDelete(id).populate('cityref');
    res.status(200).send(country);
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.countryUpdate = async (req, res, next) => {
  try{
    const id = req.params.id;
    const country = await Country.findByIdAndUpdate(id, {$set: {
      country: req.body.country,
      cityref: req.body.cityref
    }}).populate('cityref');
    res.status(200).send(country);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
