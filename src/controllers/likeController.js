const likeService = require('../services/likeService');
const { catchAsync, BaseError } = require('../utils/error');

const likeFeeds = catchAsync(async (req, res) => {
  const { user_id, feed_id } = req.body;

  const like = await likeService.createLike(user_id, feed_id);

  res.status(201).json(like);
});

module.exports = {
  likeFeeds
};
