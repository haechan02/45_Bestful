const bestDao = require('../models/bestDao');

const getBestFeed = async (offset, limit, genderId, seasonId, styleId) => {
  return await bestDao.getBestFeed(offset, limit, genderId, seasonId, styleId);
};

module.exports = {
  getBestFeed,
};
