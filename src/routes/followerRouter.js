const express = require('express');
const followerController = require('../controllers/followerController');
const checkLogInToken = require('../utils/auth');
const { catchAsync } = require('../utils/error');

const router = express.Router();

router.post('/', checkLogInToken, followerController.followUser);
router.delete('/', checkLogInToken, followerController.unfollowUser);
router.get('/:userId', checkLogInToken, followerController.getFollowers);
router.get('/following/:userId', checkLogInToken, followerController.getFollowings);

module.exports = {
  router,
};
