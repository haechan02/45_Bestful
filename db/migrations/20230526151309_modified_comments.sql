-- migrate:up
ALTER TABLE comments MODIFY COLUMN user_id INT DEFAULT 0;

ALTER TABLE tags MODIFY COLUMN coordinate_x INT;

ALTER TABLE tags MODIFY COLUMN coordinate_y INT;

-- migrate:down

