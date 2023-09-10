const Joi = require('joi')

const userRegistration = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const userLogin = Joi.object({
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});


module.exports = {
  userRegistration,
  userLogin
}