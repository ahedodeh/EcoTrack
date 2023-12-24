const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');

const router = express.Router();

router.get('/searchUsers',authenticateUser, userController.searchUsers);
router.post('/', userController.createUser); 
router.get('/', authenticateUser, userController.getUser); 
router.put('/',authenticateUser, userController.updateUser);
router.delete('/', authenticateUser, userController.deleteUser); 
router.post('/login', userController.login); 

router.use(handleError);

module.exports = router;
