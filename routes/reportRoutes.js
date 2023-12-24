const express = require('express');
const router = express.Router();
const communityReportController = require('../controllers/reportController');
const { handleError } = require('../middleware/errHandling');
const { authenticateUser } = require('../middleware/authentication');

router.post('/', authenticateUser, communityReportController.createReport);
router.get('/user', authenticateUser, communityReportController.getReportsByUserId);
router.get('/', authenticateUser, communityReportController.getAllReports); 
router.get('/:id', authenticateUser, communityReportController.getReportById);
router.put('/:id', authenticateUser, communityReportController.updateReport);
router.delete('/:id', authenticateUser, communityReportController.deleteReport);

router.use(handleError);

module.exports = router;
