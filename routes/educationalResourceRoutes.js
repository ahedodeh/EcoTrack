const express = require('express');
const router = express.Router();
const educationalResourceController = require('../controllers/educationalResourceController');
const { handleError } = require('../middleware/errHandling');
const { authenticateUser } = require('../middleware/authentication');

router.get('/', educationalResourceController.getAllResources);
router.get('/:id', educationalResourceController.getResourceById);
router.post('/', authenticateUser, educationalResourceController.createResource);
router.put('/:id', authenticateUser, educationalResourceController.updateResource);
router.delete('/:id', authenticateUser, educationalResourceController.deleteResource);

router.use(handleError);

module.exports = router;
