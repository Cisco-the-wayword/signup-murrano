const express = require('express');
const router = express.Router();
const Middleware = require('../middleware/Middleware');

// Protected route example
router.get('/protected', Middleware, (req, res) => {
    res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;
