const EducationalResource = require('../models/educationalResource');

exports.getAllResources = async (req, res) => {
  try {
    const resources = await EducationalResource.getAllResources();
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getResourceById = async (req, res) => {
  const resourceId = req.params.id;
  try {
    const resource = await EducationalResource.getResourceById(resourceId);
    if (!resource) {
      res.status(404).json({ error: 'Educational resource not found' });
    } else {
      res.json(resource);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createResource = async (req, res) => {
  const { title, content, author } = req.body;
  const userIdFromToken = req.userId; // Assuming userId is extracted from the token

  try {
    const newResourceId = await EducationalResource.createResource(title, content, author, userIdFromToken);
    res.status(201).json({ resource_id: newResourceId, message: 'Educational resource created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateResource = async (req, res) => {
  const resourceId = req.params.id;
  const { title, content, author } = req.body;
  try {
    const result = await EducationalResource.updateResource(resourceId, title, content, author);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Educational resource not found' });
    } else {
      res.json({ message: 'Educational resource updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteResource = async (req, res) => {
  const resourceId = req.params.id;
  try {
    const result = await EducationalResource.deleteResource(resourceId);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Educational resource not found' });
    } else {
      res.json({ message: 'Educational resource deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
