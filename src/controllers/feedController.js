const feedService = require('../services/feedService');
const { catchAsync } = require('../utils/error');

const getAllFeed = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId, orderBy } = req.query;
  const { feedId, targetUserId, selectedUserId } = req.params;
  const userId = req.user;

  const DEFAULT_LIMIT = 3;

  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(userId, feedId, targetUserId, selectedUserId, offset, limit, genderId, seasonId, styleId, orderBy);

  return res.status(200).json(result);
});

const uploadFeed = async (req, res, next) => {
  const userId = req.user.id;
  const { feedDescription } = req.body;
  const feedInfo = JSON.parse(req.body.feedInfo);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  const contentUrls = req.files.map((file) => file.location);

  if (!contentUrls || contentUrls.length === 0) {
    return res.status(400).json({ message: 'No content URLs extracted.' });
  }

  try {
    await feedService.uploadFeed(userId, feedDescription, contentUrls, feedInfo);
    res.status(201).json({ message: 'Feed uploaded successfully.' });
  } catch (error) {
    next(error);
  }
};

const deleteFeed = async (userId, feedId) => {
  const feed = await feedDao.getFeedById(feedId);
  if (!feed) {
    throw new Error('Post does not exist');
  }
  if (feed.user_id !== userId) {
    throw new Error('User does not match the post id');
  }
  await feedDao.deleteFeed(userId, feedId);
  return { message: 'Feed successfully deleted.' };
};

module.exports = {
  getAllFeed,
  uploadFeed,
  deleteFeed,
};
