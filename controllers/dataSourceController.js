const DataSourceModel = require('../models/dataSource');

exports.createDataSource = (req, res) => {
  const { sourceName, sourceType } = req.body;


  DataSourceModel.createDataSource(sourceName, sourceType, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Data Source created successfully' });
    }
  });
};

exports.getDataSource = (req, res) => {
  const sourceID = req.params.sourceid;

  DataSourceModel.getDataSource(sourceID, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'Data Source not found' });
      }
    }
  });
};

exports.updateDataSource = (req, res) => {
  const sourceID = req.params.sourceid;
  const { sourceName, sourceType } = req.body;

  DataSourceModel.getDataSource(sourceID, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        DataSourceModel.updateDataSource(sourceID, sourceName, sourceType, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(200).json({ message: 'Data Source updated successfully' });
          }
        });
      } else {
        res.status(404).json({ message: 'Data Source not found' });
      }
    }
  });
};

exports.deleteDataSource = (req, res) => {
  const sourceID = req.params.sourceid;

  DataSourceModel.getDataSource(sourceID, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        DataSourceModel.deleteDataSource(sourceID, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(200).json({ message: 'Data Source deleted successfully' });
          }
        });
      } else {
        res.status(404).json({ message: 'Data Source not found' });
      }
    }
  });
};
