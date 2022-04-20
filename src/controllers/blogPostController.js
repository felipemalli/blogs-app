const blogPostService = require('../services/blogPostService');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  try {
    const blogPost = await blogPostService.create(title, content, categoryIds, req.user.id);
    return res.status(201).json(blogPost);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const blogPosts = await blogPostService.getAll();
    return res.status(200).json(blogPosts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blogPosts = await blogPostService.getById(id);
    return res.status(200).json(blogPosts);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await blogPostService.update(title, content, id, req.user.id);
    return res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await blogPostService.remove(id, req.user.id);
    return res.status(204).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};