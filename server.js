'use strict';

const app = require('./app');
const connectMongoDB = require('./services/mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port ${port}`));