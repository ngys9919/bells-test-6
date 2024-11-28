const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderService = require('../services/orderService');
const checkoutService = require('../services/checkoutService');
const UserAuth = require('../middleware/UserAuth');
const logHttpUrl = require('../middleware/HttpUrl');

// Apply the logHttpUrl middleware to all routes
router.use(logHttpUrl);

// Apply the UserAuth middleware to router.post route only
router.post('/', UserAuth, async (req, res) => {
    try {
        const session = await checkoutService.checkout(req.user.userId);
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
