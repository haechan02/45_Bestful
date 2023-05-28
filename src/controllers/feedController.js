const feedService = require('../services/feedService');
const { catchAsync } = require('../utils/error');

const getAllFeed = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId } = req.query;

  const DEFAULT_LIMIT = 6;
  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(offset, limit, genderId, seasonId, styleId);

  return res.status(200).json(result);
});

const getAllFeedFollowings = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId, orderBy } = req.query;
  const userId = req.user.id;

  const DEFAULT_LIMIT = 3;

  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(offset, limit, genderId, seasonId, styleId, orderBy, userId);

  return res.status(200).json(result);
});

const feedUpload = catchAsync(async (req, res) => {});

const getSeasons = catchAsync(async (req, res) => {
  const seasons = await feedService.getSeasons();
  return res.status(200).json(seasons);
});

const getStyles = catchAsync(async (req, res) => {
  const styles = await feedService.getStyles();
  return res.status(200).json(styles);
});

module.exports = {
  getAllFeed,
  getAllFeedFollowings,
  getSeasons,
  getStyles,
};
