const express = require('express');
const router = express.Router();
const fileController = require('../controllers/dataUploadController');
const { authenticateUser } = require('../middleware/authentication');
const { handleError } = require('../middleware/errHandling');

router.post('/files/upload/:folderName',authenticateUser, fileController.uploadFile);

router.get('/files/:folderName',authenticateUser, fileController.listFiles);

router.delete('/files/:folderName/:fileName',authenticateUser, fileController.deleteFile);

router.use(handleError);

module.exports = router;
