const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, categoryController.create);
router.get('/', authMiddleware, categoryController.getAll);

module.exports = router;