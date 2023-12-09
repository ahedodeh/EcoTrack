const EnvironmentalData = require('../models/openData');

exports.getAllData = (req, res) => {
  EnvironmentalData.getAll((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getDataByLocation = (req, res) => {
  const { location } = req.params;

  EnvironmentalData.getByLocation(location, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getPaginatedData = (req, res) => {
  const { page, pageSize } = req.params;

  EnvironmentalData.getPaginatedData(page, pageSize, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getSortedData = (req, res) => {
  const { sortBy } = req.params;

  EnvironmentalData.getSortedData(sortBy, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getFilteredData = (req, res) => {
  const { filterBy, filterValue } = req.params;

  EnvironmentalData.getFilteredData(filterBy, filterValue, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getMedianValue = (req, res) => {
  const { attribute } = req.params;

  EnvironmentalData.getMedianValue(attribute, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};



exports.getMode = (req, res) => {
  const { attribute } = req.params;

  EnvironmentalData.getMode(attribute, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.getCount = (req, res) => {
  EnvironmentalData.getCount((err, count) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ count });
    }
  });
};
