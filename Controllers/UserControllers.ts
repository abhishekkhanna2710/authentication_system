const authModel = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../src/utils/jwt');
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Check if user already exists
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new authModel({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate tokens
        const accessToken = generateAccessToken({ id: newUser._id });
        const refreshToken = generateRefreshToken({ id: newUser._id });

        // Send response
        res.status(201).json({ message: 'User created successfully', accessToken, refreshToken });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate tokens
        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        // Send response
        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// const refreshAccessToken = (req, res) => {
//     const { refreshToken } = req.body;
//     if (!refreshToken) return res.sendStatus(401);

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);

//         const accessToken = generateAccessToken({ id: user.id });
//         res.json({ accessToken });
//     });
// };

module.exports = { createUser, loginUser };

