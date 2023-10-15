const mongoose = require('mongoose');
require('dotenv').config();

const options = {
    autoIndex: true,
    maxPoolSize: 100,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4
};

const uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=$${process.env.MONGODB_AUTH_SOURCE}`

mongoose.connect(uri, options)

mongoose.connection.on('error', err => {
	console.error(err);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = mongoose;