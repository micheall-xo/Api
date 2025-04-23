const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {
  getAllUsers, getUser, updateUser, deleteUser
} = require('../controllers/userController');

router.get('/', auth, roleCheck('admin'), getAllUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, roleCheck('admin'), deleteUser);

module.exports = router;