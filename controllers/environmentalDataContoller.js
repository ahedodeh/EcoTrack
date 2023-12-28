const environmentalData = require('../models/environmentalData');


exports.createEnvironmentalData = (req, res) => {
  const userIdFromToken = req.userId;
  const data = req.body;

  environmentalData.create(data, userIdFromToken, (err, result, message) => {
    if (err) {
      console.error('Error creating environmental data record:', err);
      return res.status(500).json({ error: message });
    }

    res.status(201).json({ message: message });
  });
};

exports.getEnvironmentalDataById = (req, res) => {
  const { data_id } = req.params;

  environmentalData.findById(data_id, (err, environmentalData) => {
    if (err) {
      console.error('Error fetching environmental data record:', err);
      return res.status(500).json({ error: 'Failed to fetch environmental data record' });
    }

    if (environmentalData) {
      res.status(200).json(environmentalData);
    } else {
      res.status(404).json({ message: 'Environmental data record not found' });
    }
  });
};

exports.updateEnvironmentalData = (req, res) => {
  const { data_id } = req.params;
  const newData = req.body;

  environmentalData.update(data_id, newData, (err, isUpdated) => {
    if (err) {
      console.error('Error updating environmental data record:', err);
      return res.status(500).json({ error: 'Failed to update environmental data record' });
    }

    if (isUpdated) {
      const updatedEnvironmentalData = { data_id, ...newData };
      res.status(200).json(updatedEnvironmentalData);
    } else {
      res.status(404).json({ message: 'Environmental data record not found' });
    }
  });
};

exports.deleteEnvironmentalData = (req, res) => {
  const { data_id } = req.params;

  environmentalData.deleteById(data_id, (err, isDeleted) => {
    if (err) {
      console.error('Error deleting environmental data record:', err);
      return res.status(500).json({ error: 'Failed to delete environmental data record' });
    }

    if (isDeleted) {
      res.status(200).json({ message: 'Environmental data record deleted successfully' });
    } else {
      res.status(404).json({ message: 'Environmental data record not found' });
    }
  });
};
