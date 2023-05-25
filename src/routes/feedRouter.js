const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const auth = require('../utils/auth');

router.get('', feedController.getAllFeedCreatedAt);

module.exports = { router };