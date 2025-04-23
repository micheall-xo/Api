const express = require('express');
const router = express.Router(); // << this must be BEFORE you use router
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const categoryController = require('../controllers/categoryController');

// Use the router AFTER it's defined
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', auth, roleCheck('admin'), categoryController.createCategory);
router.put('/:id', auth, roleCheck('admin'), categoryController.updateCategory);
router.delete('/:id', auth, roleCheck('admin'), categoryController.deleteCategory);

module.exports = router;
