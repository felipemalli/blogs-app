const router = require('express').Router();
const userController = require('../controllers/userController');
const { loginValidation } = require('../middlewares/userMiddleware');

router.post('/', loginValidation, userController.login);

module.exports = router;