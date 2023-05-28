const feedDao = require('../models/feedDao');

const getAllFeed = async (offset, limit, genderId, seasonId, styleId, orderBy, userId) => {
  return await feedDao.getAllFeed(offset, limit, genderId, seasonId, styleId, orderBy, userId);
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
