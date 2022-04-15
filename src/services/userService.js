const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const { User } = require('../models/user');
const conflict = require('../error/conflict');

const create = async (displayName, email, password, image) => {
  const existEmail = await User.findOne({ where: { email } });

  if (!existEmail) throw conflict('User already registered');

  const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, jwtConfig);

  await User.create({ displayName, email, password, image });

  return token;
};

module.exports = {
  create,
};