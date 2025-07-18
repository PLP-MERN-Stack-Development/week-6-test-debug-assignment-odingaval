const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');

router.post('/', auth, postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.put('/:id', auth, postsController.updatePost);
router.delete('/:id', auth, postsController.deletePost);

module.exports = router; 