const router = require('express').Router();
const blogPostController = require('../controllers/blogPostController');
const authMiddleware = require('../middlewares/authMiddleware');
const { createPostValidation, updatePostValidation } = require('../middlewares/postMiddleware');

router.post('/', authMiddleware, createPostValidation, blogPostController.create);
router.get('/search', authMiddleware, blogPostController.getBySearch);
router.get('/:id', authMiddleware, blogPostController.getById);
router.get('/', authMiddleware, blogPostController.getAll);
router.put('/:id', authMiddleware, updatePostValidation, blogPostController.update);
router.delete('/:id', authMiddleware, blogPostController.remove);

module.exports = router;