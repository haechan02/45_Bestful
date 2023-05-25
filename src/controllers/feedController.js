const feedService = require('../services/feedService');
const { catchAsync } = require('../utils/error');

const getAllFeedCreatedAt = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId } = req.query;

  const DEFAULT_LIMIT = 6;
  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeedCreatedAt(
    offset,
    limit,
    genderId,
    seasonId,
    styleId
  );

  return res.status(200).json(result);
});

const feedUpload = catchAsync(async (req, res) => {

})

module.exports = { getAllFeedCreatedAt };
