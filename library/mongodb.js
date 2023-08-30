const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=$${process.env.MONGODB_AUTH_SOURCE}`
            , {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host} : ${conn.connection.port}`);
    } catch (err) {
        console.error({mongodb_error: err});
        process.exit(1);
    }
}

module.exports = connectMongoDB;