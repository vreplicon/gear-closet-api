-- first remove any data that may be present
TRUNCATE lists RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO lists
  (user_id, list_name, list_description)
  VALUES
    (1, 'The Big Climb', 'Going to go send that project'),
    (1, 'Mount Whitney', 'Going to the top of the mountian');
