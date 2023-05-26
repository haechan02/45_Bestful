const express = require('express');
const router = express.Router();
const bestController = require('../controllers/bestController');

router.get('/best', bestController.getBestFeed);

module.exports = { router };
