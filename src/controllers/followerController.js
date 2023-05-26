const followerService = require('../services/followerService');
const { catchAsync, BaseError } = require('../utils/error');

const followUser = async (req, res, next) => {
  const { userId, followedId } = req.body;

  try {
    const result = await followerService.followUser(userId, followedId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const unfollowUser = async (req, res, next) => {
  const { userId, followedId } = req.body;

  try {
    const result = await followerService.unfollowUser(userId, followedId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getFollowers = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const followers = await followerService.getFollowers(userId);
    res.status(200).json(followers);
  } catch (err) {
    next(err);
  }
};

const getFollowings = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const followings = await followerService.getFollowings(userId);
    res.status(200).json(followings);
  } catch (err) {
    next(err);
  }
};

const getFeedFollowings = catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log(`1111111`, userId);
  const { from, count, genderId, seasonId, styleId } = req.query;

  const DEFAULT_LIMIT = 6;

  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await followerService.getFeedFollowings(
    offset,
    limit,
    genderId,
    seasonId,
    styleId,
    userId
  );

  return res.status(200).json(result);
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getFeedFollowings,
};
