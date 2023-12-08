const CommunityReport = require('../models/report');

exports.createReport = async (req, res) => {
  try {
    const { report_type, description } = req.body;

    if (!report_type || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newReportId = await CommunityReport.create({ user_id: userId, report_type, description });

    res.status(201).json({ report_id: newReportId, message: 'Report created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getReportById = async (req, res) => {
  const reportId = req.params.id;
  try {
    const report = await CommunityReport.findById(reportId);
    if (!report) {
      res.status(404).json({ error: 'Report not found' });
    } else {
      res.json(report);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateReport = async (req, res) => {
  const reportId = req.params.id;
  const { report_type, description } = req.body;

  try {
    const result = await CommunityReport.update(reportId, {  report_type, description });
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Report not found' });
    } else {
      res.json({ message: 'Report updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteReport = async (req, res) => {
  const reportId = req.params.id;
  try {
    const result = await CommunityReport.delete(reportId);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Report not found' });
    } else {
      res.json({ message: 'Report deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getReportsByUserId = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const reports = await CommunityReport.findByUserId(userId);
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllReports = async (req, res) => {
  try {
    const reports = await CommunityReport.findAll();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

