const express = require('express');
const auth = require('../middleware/auth');
const ownerCheck = require('../middleware/ownerCheck');
const {
  getAllBlogs, getBlog, createBlog,
  updateBlog, deleteBlog, addComment, getStats
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.post('/', auth, createBlog);
router.put('/:id', auth, ownerCheck, updateBlog);
router.delete('/:id', auth, ownerCheck, deleteBlog);
router.post('/:id/comments', auth, addComment);
router.get('/stats/category', getStats);

module.exports = router;


