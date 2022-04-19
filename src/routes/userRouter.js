const router = require('express').Router();
const userController = require('../controllers/userController');
const { createUserValidation } = require('../middlewares/userMiddleware');

router.post('/', createUserValidation, userController.create);

module.exports = router;