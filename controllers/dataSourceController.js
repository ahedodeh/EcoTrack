const DataSourceModel = require('../models/dataSource');

exports.createDataSource = (req, res) => {
  const { sourceName, sourceType } = req.body;

  DataSourceModel.createDataSource(sourceName, sourceType, (result) => {
    res.status(result.status).json({ message: result.message });
  });
};



exports.updateDataSource = (req, res) => {
  const sourceID = req.params.sourceid;
  const { sourceName, sourceType } = req.body;

  DataSourceModel.updateDataSource(sourceID, sourceName, sourceType, (result) => {
    res.status(result.status).json({ message: result.message });
  });
};


exports.getDataSource = (req, res) => {
  const sourceName = req.params.sourceid;

  DataSourceModel.getDataSource(sourceName, (result) => {
    res.status(result.status).json({ message: result.message });
  });
};

exports.deleteDataSource = (req, res) => {
  const sourceName = req.params.sourceid;

  DataSourceModel.deleteDataSource(sourceName, (result) => {
    res.status(result.status).json({ message: result.message });
  });
};
