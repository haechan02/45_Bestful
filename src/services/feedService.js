const feedDao = require('../models/feedDao');

const getAllFeed = async (offset, limit, genderId, seasonId, styleId) => {
  return await feedDao.getAllFeed(offset, limit, genderId, seasonId, styleId);
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
  getStyles
};
