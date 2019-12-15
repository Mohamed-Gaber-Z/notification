const Joi = require('joi');

function validation (notification) {
const schema = {
  text: Joi.string().required(),
  seen: Joi.boolean(),
  user: Joi.required()
};

return Joi.validate(notification, schema);
};

exports.validation = validation;
