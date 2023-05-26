const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const commentController = require('../controllers/commentController');
const bestController = require('../controllers/bestController');
const follwerController = require('../controllers/followerController');
const auth = require('../utils/auth');

router.get('', feedController.getAllFeed);
router.get('/:feedId/comment', commentController.getCommentByFeedId);
router.get('/best', bestController.getBestFeed);
router.get('/:userId/followings', follwerController.getFeedFollowings);
module.exports = { router };
