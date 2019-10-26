-- first remove any data that may be present
TRUNCATE users RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO users
  (email, user_password)
  VALUES
    ('joe@smith.com', 'pass1'),
    ('hikes@nps.org', 'pass2'),
    ('elCap@example.com', 'pass3');