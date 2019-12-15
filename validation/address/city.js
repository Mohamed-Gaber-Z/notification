const Joi = require('joi');

function cityValidation (city) {
  const schema = {
    city: Joi.string().required().min(3).max(200)
  };
  return Joi.validate(city, schema);
}

exports.cityValidation = cityValidation;
