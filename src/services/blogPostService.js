const { BlogPost, Category, User } = require('../models');
const badRequest = require('../error/badRequest');
const notFound = require('../error/notFound');
// const unauthorized = require('../error/unauthorized');

const create = async (title, content, categoryIds, userId) => {
  const categories = await Promise.all(categoryIds.map((eachId) => Category.findByPk(eachId)));
  if (categories.some((c) => !c)) throw badRequest('"categoryIds" not found');

  const post = await BlogPost.create({ userId, title, content });

  post.addCategory(categories);

  categories.addPost(post);

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
  const blogPosts = await BlogPost.findByPk(id, { 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!blogPosts) throw notFound('Post does not exist');
  return blogPosts;
};

// const update = async (id) => {
//   const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
//   if (!user) throw notFound('User does not exist');
//   return user;
// };

// const remove = async (id) => {
//   const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
//   if (!user) throw notFound('User does not exist');
//   return user;
// };

module.exports = {
  create,
  getAll,
  getById,
  // update,
  // remove,
};