const Joi = require('joi');
const badRequest = require('../error/badRequest');

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const createUserValidation = (req, _res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const { error } = createUserSchema.validate({ displayName, email, password });
    if (error) throw badRequest(error.details[0].message);
    next();
  } catch (error) {
    next(error);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const loginValidation = (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });
    if (error) throw badRequest(error.details[0].message);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserValidation,
  loginValidation,
}; 