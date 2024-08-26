const express = require('express');
const app = express();
const port = 3002;

const connectDB = require('./config/db');
const digimonRoutes = require('./routes/digimonRoutes');

connectDB();

app.use(express.json()); // Add this line to parse JSON bodies
app.use('/api', digimonRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});