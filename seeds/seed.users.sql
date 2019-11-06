-- first remove any data that may be present
TRUNCATE users RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO users
  (email)
  VALUES
    ('joe@smith.com'),
    ('hikes@nps.org'),
    ('elCap@example.com');