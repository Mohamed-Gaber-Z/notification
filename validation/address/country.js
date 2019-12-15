const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function countryValidation (country) {
  const schema = {
    country: Joi.string().required().min(3).max(200),
    cityref: Joi.objectId().required()
  };
  return Joi.validate(country, schema);
}

exports.countryValidation = countryValidation;
