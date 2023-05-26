const bestService = require('../services/bestService');
const { catchAsync } = require('../utils/error');

const getBestFeed = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId } = req.query;

  const DEFAULT_LIMIT = 6;
  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await bestService.getBestFeed(
    offset,
    limit,
    genderId,
    seasonId,
    styleId
  );

  return res.status(200).json(result);
});

module.exports = { getBestFeed };
