const app = require('./app');
const connectMongoDB = require('./library/mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


//Make sure your MongoDB is running! before you start the server
connectMongoDB().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err) => {});
