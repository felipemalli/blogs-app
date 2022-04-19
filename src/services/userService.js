const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const { User } = require('../models');
const conflict = require('../error/conflict');
const badRequest = require('../error/badRequest');

const create = async (displayName, email, password, image) => {
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) throw conflict('User already registered');

  const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, jwtConfig);

  await User.create({ displayName, email, password, image });

  return token;
};

const login = async (email, password) => {
  const existUser = await User.findOne({ where: { email } });

  if (!existUser) throw badRequest('Invalid fields');

  if (existUser.dataValues.password !== password) throw badRequest('Invalid password');

  const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = {
  create,
  login,
};