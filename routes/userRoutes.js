const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');

const router = express.Router();

router.get('/searchUsers', userController.searchUsers);
router.post('/', userController.createUser); 
router.get('/:userId', authenticateUser, userController.getUser); 
router.put('/:userId', userController.updateUser);
router.delete('/:userId', authenticateUser, userController.deleteUser); 
router.post('/login', userController.login); 

router.use(handleError);

module.exports = router;
