const express = require('express');
const messageController = require('../controllers/messageController');
const { handleError } = require('../middleware/errHandling');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.post('/send', authenticateUser, messageController.sendMessages);
router.get('/receive/:user_id', authenticateUser, messageController.receiveMessages);

router.use(handleError);

module.exports = router;
