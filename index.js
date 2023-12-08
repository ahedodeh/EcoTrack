const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dataSourceRoutes = require('./routes/dataSourceRoutes');
const dataUploadRoutes = require('./routes/dataUploadRoutes');
const environmentalDataRoutes = require('./routes/environmentalDataRoutes');
const externalRoutes = require('./routes/externalRoutes');

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/dataSources', dataSourceRoutes);
app.use('/api/dataUpload', dataUploadRoutes); 
app.use('/api/environmentalData', environmentalDataRoutes);
app.use('/api/external', externalRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
