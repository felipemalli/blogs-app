const userService = require('../services/userService');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const token = await userService.create(displayName, email, password, image);
    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
};