const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const checkLogInToken = require('../utils/auth');

router.get('', feedController.getAllFeed);
router.get('/best', feedController.getAllFeed);
router.get('/:feedId', feedController.getAllFeed);
router.get('/users/:targetUserId', feedController.getAllFeed);
router.get('/likes/:selectedUserId', feedController.getAllFeed);
router.get('/followings', checkLogInToken, feedController.getAllFeedFollowings)
router.post('/upload', checkLogInToken, feedController.uploadFeed);
router.delete('/:feedId', checkLogInToken, feedController.deleteFeed);
router.get('/seasons', feedController.getSeasons);
router.get('/styles', feedController.getStyles);

module.exports = { router };
