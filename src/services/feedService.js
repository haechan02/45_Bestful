const feedDao = require('../models/feedDao');

const getAllFeed = async (
  feedId,
  targetUserId,
  selectedUserId,
  offset,
  limit,
  genderId,
  seasonId,
  styleId,
  orderBy,
  userId
) => {
  return await feedDao.getAllFeed(
    feedId,
    targetUserId,
    selectedUserId,
    offset,
    limit,
    genderId,
    seasonId,
    styleId,
    orderBy,
    userId
  );
};

module.exports = {
  getAllFeed,
};

const getSeasons = async () => {
  return await feedDao.getSeasons();
};

const getStyles = async () => {
  return await feedDao.getStyles();
};

module.exports = {
  getAllFeed,
  getSeasons,
  getStyles,
};
