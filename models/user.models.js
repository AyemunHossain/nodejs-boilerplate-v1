const mongoose = require('../services/mongodb');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, default: null, unique: true  },
    salt: { type: String, required: false, default: null },
    hash: { type: String, required: false, default: null },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;