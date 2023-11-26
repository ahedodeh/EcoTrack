const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');

const router = express.Router();

router.post('/', userController.createUser); // done
router.get('/:userId', authenticateUser, userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', authenticateUser, userController.deleteUser);
router.get('/searchUsers', userController.searchUsers);
router.post('/login', userController.login); // done

router.use(handleError);

module.exports = router;
