const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');

const router = express.Router();

router.get('/searchUsers', authenticateUser, userController.searchUsers);
router.post('/', userController.createUser);
router.post('/login', userController.login);

router.get('/profile', authenticateUser, userController.getUser);
router.put('/profile', authenticateUser, userController.updateUser);

router.delete('/profile', authenticateUser, userController.deleteUser);

router.use(handleError);

module.exports = router;
