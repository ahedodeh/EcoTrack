const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); 


const externalRoutes = require('./routes/externalRoutes');

app.use('/api/external', externalRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
