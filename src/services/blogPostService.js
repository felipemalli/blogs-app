const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const badRequest = require('../error/badRequest');
const notFound = require('../error/notFound');
const unauthorized = require('../error/unauthorized');

const create = async (title, content, categoryIds, userId) => {
  const categories = await Promise.all(categoryIds.map((eachId) => Category.findByPk(eachId)));
  if (categories.some((c) => !c)) throw badRequest('"categoryIds" not found');

  const post = await BlogPost.create({ userId, title, content });

  post.addCategory(categories);
  
  return post;
};

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, { 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!blogPost) throw notFound('Post does not exist');
  return blogPost;
};

const getBySearch = async (searchText) => {
  const blogPosts = await BlogPost.findAll({ 
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchText}%` } }, // ou [Op.substring]: searchText
        { content: { [Op.like]: `%${searchText}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

const update = async (info, userId, categoryIds) => {
  if (categoryIds) throw badRequest('Categories cannot be edited');
  
  const { title, content, id } = info;
  const blogPost = await BlogPost.findByPk(id, {
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (userId !== blogPost.userId) throw unauthorized('Unauthorized user');

  await blogPost.update({ title, content }); // OU  updatedPost.title = title;  updatedPost.content = content;  await updatedPost.save();
  return blogPost;
};

const remove = async (id, userId) => {
  const blogPost = await BlogPost.findByPk(id);
  if (!blogPost) throw notFound('Post does not exist');
  if (userId !== blogPost.userId) throw unauthorized('Unauthorized user');
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  getBySearch,
  update,
  remove,
};