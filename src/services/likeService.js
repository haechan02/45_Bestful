const likeDao = require('../models/likeDao');
const { BaseError } = require('../utils/error');

const createLike = async (user_id, feed_id) => {
  try {
    // Create the like using the DAO
    const like = await likeDao.createLike(user_id, feed_id);
    return like;
  } catch (error) {
    throw new BaseError('Failed to create like.', 500);
  }
};

module.exports = {
  createLike
};