const { Category } = require('../models');
const badRequest = require('../error/badRequest');

const create = async (name) => {
  if (!name) throw badRequest('"name" is required');

  const category = await Category.create({ name });

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};