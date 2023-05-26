-- migrate:up
ALTER TABLE comments MODIFY contents VARCHAR(500) DEFAULT 'default value';

-- migrate:down

