const router = require('express').Router();
const userController = require('../controllers/userController');
const { createUserValidation } = require('../middlewares/userMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', createUserValidation, userController.create);
router.get('/', authMiddleware, userController.getAll);
router.get('/:id', authMiddleware, userController.getById);
router.delete('/me', authMiddleware, userController.remove);

module.exports = router;