const Joi = require('joi');
const badRequest = require('../error/badRequest');

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const createPostValidation = (req, _res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { error } = createPostSchema.validate({ title, content, categoryIds });
    if (error) throw badRequest(error.details[0].message);
    next();
  } catch (error) {
    next(error);
  }
};

const updatePostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const updatePostValidation = (req, _res, next) => {
  try {
    const { title, content } = req.body;
    const { error } = updatePostSchema.validate({ title, content });
    if (error) throw badRequest(error.details[0].message);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPostValidation,
  updatePostValidation,
};