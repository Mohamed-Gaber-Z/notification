const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validation(count) {
  const schema = {
    count: Joi.number().required(),
    user: Joi.objectId().required()
  }

  return Joi.validate(count, schema);
};

exports.validation = validation;
