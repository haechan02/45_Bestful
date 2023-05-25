const dataSource = require('./dataSource');
const { DatabaseError } = require('../utils/error');

const createLike = async (user_id, feed_id) => {
  try {
    // Perform the database query to create the like
    const query = 'INSERT INTO likes (user_id, feed_id) VALUES (?, ?)';
    const values = [user_id, feed_id];
    const result = await dataSource.query(query, values);

    // Return the created like
    const createdLikeId = result.insertId;
    return { id: createdLikeId, user_id, feed_id };
  } catch (error) {
    throw new DatabaseError('Failed to create like in the database.', 500);
  }
};

module.exports = {
  createLike
};
