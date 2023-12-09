const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dataSourceRoutes = require('./routes/dataSourceRoutes');
const dataUploadRoutes = require('./routes/dataUploadRoutes');
const environmentalDataRoutes = require('./routes/environmentalDataRoutes');
const externalRoutes = require('./routes/externalRoutes');
const educationalResourceRoutes = require('./routes/educationalResourceRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sustainabilityScoreRoutes = require('./routes/sustainabilityScoreRoutes');
const openDataRoutes = require('./routes/openDataRoutes');
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/dataSources', dataSourceRoutes);
app.use('/api/dataUpload', dataUploadRoutes); 
app.use('/api/environmentalData', environmentalDataRoutes);
app.use('/api/external', externalRoutes);
app.use('/api/educationalResource', educationalResourceRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/sustainability', sustainabilityScoreRoutes);
app.use('/api/openData', openDataRoutes);

console.log("main page");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
