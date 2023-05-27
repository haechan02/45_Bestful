const feedService = require('../services/feedService');
const { catchAsync } = require('../utils/error');

const getAllFeed = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId } = req.query;

  const DEFAULT_LIMIT = 6;
  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(
    offset,
    limit,
    genderId,
    seasonId,
    styleId
  );

  return res.status(200).json(result);
});

const feedUpload = catchAsync(async (req, res) => { });

const getSeasons = catchAsync(async (req, res) => {
  const seasons = await feedService.getSeasons();
  return res.status(200).json(seasons);
});

module.exports = {
  getAllFeed,
  getSeasons
};
