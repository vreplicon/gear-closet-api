-- first remove any data that may be present
TRUNCATE gear_lists_lookup RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO gear_lists_lookup
  (list_id, gear_id)
  VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 2);