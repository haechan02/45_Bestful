-- migrate:up
ALTER TABLE comments MODIFY COLUMN feed_id INT DEFAULT 0;


-- migrate:down

