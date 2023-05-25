const feedDao = require('../models/feedDao');

const getAllFeedCreatedAt = async (
  offset,
  limit,
  genderId,
  seasonId,
  styleId
) => {
  return await feedDao.getAllFeedCreatedAt(
    offset,
    limit,
    genderId,
    seasonId,
    styleId
  );
};

module.exports = {
  getAllFeedCreatedAt,
};
