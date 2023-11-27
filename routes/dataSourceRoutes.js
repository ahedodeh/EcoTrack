const express = require('express');
const dataSourceController = require('../controllers/dataSourceController');
const { handleError } = require('../middleware/errHandling');
const { authenticateUser } = require('../middleware/authentication');  

const router = express.Router();

router.post('/', authenticateUser, dataSourceController.createDataSource);  
router.get('/:sourceid', authenticateUser, dataSourceController.getDataSource);  
router.put('/:sourceid', authenticateUser, dataSourceController.updateDataSource);  
router.delete('/:sourceid', authenticateUser, dataSourceController.deleteDataSource);  

router.use(handleError);

module.exports = router;
