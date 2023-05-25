const express = require('express');
const followerController = require('../controllers/followerController');
const { catchAsync } = require('../utils/error');

const router = express.Router();

router.post('/', catchAsync(followerController.followUser));
router.delete('/', catchAsync(followerController.unfollowUser));
router.get('/:userId', catchAsync(followerController.getFollowers));
router.get('/followings/:userId', catchAsync(followerController.getFollowings)); // Add the new route

module.exports = {
  router,
};
