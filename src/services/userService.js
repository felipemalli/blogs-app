const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const { User } = require('../models');
const conflict = require('../error/conflict');
const badRequest = require('../error/badRequest');
const notFound = require('../error/notFound');

const create = async (displayName, email, password, image) => {
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) throw conflict('User already registered');
  
  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  
  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const login = async (email, password) => {
  const existUser = await User.findOne({ where: { email } });
  
  if (!existUser) throw badRequest('Invalid fields');
  if (existUser.dataValues.password !== password) throw badRequest('Invalid password');
  
  const { dataValues: { id } } = existUser;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  if (!user) throw notFound('User does not exist');
  return user;
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  login,
  getAll,
  getById,
  remove,
};