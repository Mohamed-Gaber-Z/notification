const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validationRegistering (user) {
  const schema = {
    nameAr: Joi.string().required().min(6).max(30),
    nameEn: Joi.string().required().min(6).max(30),
    email: Joi.string().required().min(6).max(30).email(),
    phone: Joi.string().required().min(11).max(11).regex(/(01)[0-9]{9}/),
    password: Joi.string().required().min(6).max(30),
    location: Joi.array().required().min(2).max(2)
  };
  return Joi.validate(user, schema);
};

function validationLogin (user) {
  const schema = {
    email: Joi.string().required().min(6).max(30).email(),
    password: Joi.string().required().min(6).max(30)
  };
  return Joi.validate(user, schema);
}


exports.validationReg = validationRegistering;
exports.validationLogin = validationLogin;
