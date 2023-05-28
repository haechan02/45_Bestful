const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const commentController = require('../controllers/commentController');
const bestController = require('../controllers/bestController');
const follwerController = require('../controllers/followerController');
const auth = require('../utils/auth');

router.get('', feedController.getAllFeed);
router.get('/best', feedController.getAllFeed);
router.get('/:feedId', feedController.getAllFeed);
router.get('/users/:targetUserId', feedController.getAllFeed);
router.get('/likes/:selectedUserId', feedController.getAllFeed);
router.get('/followings', auth, feedController.getAllFeedFollowings);
router.get('/:feedId/comment', commentController.getCommentByFeedId);

router.get('/seasons', feedController.getSeasons);
router.get('/styles', feedController.getStyles);

module.exports = { router };
