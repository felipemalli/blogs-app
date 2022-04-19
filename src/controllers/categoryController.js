const categoryService = require('../services/categoryService');

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await categoryService.create(name);
    return res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};