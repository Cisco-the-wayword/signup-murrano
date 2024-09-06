const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Added username

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username, // Include username
            email,
            password // Store plain text password (not recommended for production)
        });

        console.log("Plain Text Password during Registration:", user.password); // Log the plain text password

        await user.save();

        // Redirect to login after successful registration
        res.status(200).json({ msg: 'Registration successful', redirect: '/public/login.html' });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Debugging login credentials
        console.log("Stored Plain Text Password:", user.password);
        console.log("Provided Password:", password);

        // Compare the provided password with the plain text password in the database
        const isMatch = (password === user.password);
        console.log("Password Match Result:", isMatch); // Log the result of the password comparison

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
});

module.exports = router;
