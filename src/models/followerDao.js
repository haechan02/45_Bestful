const dataSource = require('./dataSource');
const { DatabaseError } = require('../utils/error');
const builder = require('./builder');

const followUser = async (userId, followedId) => {
  try {
    await dataSource.query(
      `
    INSERT INTO followers (user_id, followed_id)
    VALUES (?, ?)
    `,
      [userId, followedId]
    );
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const unfollowUser = async (userId, followedId) => {
  try {
    await dataSource.query(
      `
    DELETE FROM followers
    WHERE user_id = ? AND followed_id = ?
    `,
      [userId, followedId]
    );
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const getFollowers = async (userId) => {
  try {
    const query = `
      SELECT
        users.id,
        users.email,
        users.user_name userName,
        users.cellphone,
        users.profile_image_url profileImage,
        users.sex,
        users.bio,
        users.created_at,
        users.updated_at,
        users.deleted_at
      FROM users
      WHERE EXISTS (
        SELECT 1
        FROM followers
        WHERE followers.followed_id = users.id
          AND followers.user_id = ?
      )
    `;
    const rows = await dataSource.query(query, userId);

    // Return the followers directly without converting to JSON
    return rows;
  } catch (err) {
    console.log(err);
    throw new DatabaseError('DataSource_Error: ' + err.message);
  }
};

const getFollowings = async (userId) => {
  try {
    const query = `
      SELECT
        users.id,
        users.email,
        users.user_name userName,
        users.cellphone,
        users.profile_image_url profileImage,
        users.sex,
        users.bio,
        users.created_at,
        users.updated_at,
        users.deleted_at
      FROM users
      WHERE EXISTS (
        SELECT 1
        FROM followers
        WHERE followers.user_id = users.id
          AND followers.followed_id = ?
      )
    `;
    const rows = await dataSource.query(query, userId);

    // Return the followings directly without converting to JSON
    return rows;
  } catch (err) {
    console.log(err);
    throw new DatabaseError('DataSource_Error: ' + err.message);
  }
};

const getFeedFollowings = async (
  offset,
  limit,
  genderId,
  seasonId,
  styleId,
  userId
) => {
  try {
    const baseQuery = `
      SELECT
      subq.feedId,
      subq.userName,
      subq.profile_image_url,
      subq.feedDescription,
      subq.createdAt,
      subq.likesCount,
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'contentUrl', subq.contentUrl,
            'clothesInfo', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'coordinateX', t.coordinate_x,
                        'coordinateY', t.coordinate_y,
                        'tagContent', t.contents,
                        'clothName', c.name,
                        'clothInformation', c.information,
                        'clothBuyingLink', c.buying_link,
                        'clothPrice', c.price,
                        'season', sea.seasons,
                        'style', sty.style
                      )
                  ) 
            FROM tags t
            JOIN clothes c ON t.cloth_id = c.id
            JOIN seasons sea ON c.season_id = sea.id
            JOIN styles sty ON c.style_id = sty.id
            WHERE t.content_file_id = subq.contentFileId
          )
        )
      ) AS contentUrls
        FROM (
            SELECT
                f.id AS feedId,
                u.user_name AS userName,
                u.profile_image_url,
                f.description AS feedDescription,
                DATE_FORMAT(f.created_at, '%Y.%m.%d') AS createdAt,
                c_f.content_url AS contentUrl,
                c_f.id AS contentFileId,
                COUNT(DISTINCT l.id) likesCount
            FROM feed f
            JOIN users u ON u.id = f.user_id
            JOIN content_files c_f ON c_f.feed_id = f.id
            LEFT JOIN likes l ON l.feed_id = f.id
            JOIN tags t ON c_f.id = t.content_file_id
            JOIN clothes c ON t.cloth_id = c.id
            JOIN seasons sea ON c.season_id = sea.id
            JOIN styles sty ON c.style_id = sty.id  
        `;

    const whereCondition = builder.filterBuilder(
      genderId,
      seasonId,
      styleId,
      userId
    );
    const sortQuery = `ORDER BY subq.createdAt DESC`;
    const limitQuery = builder.limitBuilder(offset, limit);
    const groupByQuery = ` 
    GROUP BY 
    f.id, 
    u.user_name, 
    u.profile_image_url, 
    f.description, 
    DATE_FORMAT(f.created_at, '%Y.%m.%d'),
    c_f.content_url, 
    c_f.id
    ) AS subq 
    GROUP BY 
    subq.feedId, 
    subq.userName, 
    subq.profile_image_url, 
    subq.feedDescription, 
    subq.createdAt,
    subq.likesCount`;

    await console.log(
      `${baseQuery} ${whereCondition} ${groupByQuery} ${sortQuery} ${limitQuery}`
    );

    const rooms = await dataSource.query(
      `${baseQuery} ${whereCondition} ${groupByQuery} ${sortQuery} ${limitQuery}`
    );
    return rooms;
  } catch (error) {
    console.log(error);
    throw new DatabaseError('CAN_NOT_GET_FEEDS');
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getFeedFollowings,
};
