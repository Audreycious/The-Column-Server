
ALTER TABLE users
DROP COLUMN IF EXISTS articlesleft,
ADD articlesleft INTEGER NOT NULL DEFAULT 3;