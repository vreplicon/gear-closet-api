-- first remove any data that may be present
TRUNCATE folder_name RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO users
  (folder_name)
  VALUES
    ('Important'),
    ('Spangley'),
    ('Super');