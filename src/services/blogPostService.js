const { BlogPost, Category } = require('../models');
const badRequest = require('../error/badRequest');
// const notFound = require('../error/notFound');
// const unauthorized = require('../error/unauthorized');

const create = async (title, content, categoryIds, userId) => {
  await Promise.all(categoryIds.map(async (eachId) => {
    const exist = await Category.findByPk(eachId);
    if (!exist) throw badRequest('"categoryIds" not found');
  }));

  const post = await BlogPost.create({
    userId,
    title,
    content,
  });

  // await Promise.all(categories.map(async (eachCategory) => {   --> forma de informar a tabela auxiliar??
  //   await PostsCategories.create({
  //     postId: id,                      --> puxar id do controller?
  //     categoryId: eachCategory,
  //   });
  // }));

  // post.addCategory(categories); // --> outra forma??

  return post;
};

// const getAll = async () => {
//   const categories = await Category.findAll();
//   return categories;
// };

// const getById = async (id) => {
//   const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
//   if (!user) throw notFound('User does not exist');
//   return user;
// };

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
  // getAll,
  // getById,
  // update,
  // remove,
};