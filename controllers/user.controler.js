const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.models')

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, hash });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token , expiresIn: '1d'});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error('User not found');
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.hash);
        if (!isPasswordCorrect) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};