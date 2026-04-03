'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config'); // Assume there's a config file for the secret

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
    // Get token from the headers
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    // Verify token
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        // Save user ID for use in other routes
        req.userId = decoded.id;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = verifyToken;
