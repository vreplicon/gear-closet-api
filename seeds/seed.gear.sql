-- first remove any data that may be present
TRUNCATE gear RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO gear
  (user_id, gear_name, gear_type, gear_weight, weight_unit, notes)
  VALUES
    (1, 'Crash pad', 'Rock Climbing', 14.0, 'oz', NULL),
    (1, 'Quickdraw', 'Rock Climbing', 4.0, 'oz', 'Made by Black Diamond'),
    (1, 'V Harness', 'Rock Climbing', 16.0, 'oz', 'Love this harness though not good to take on longer trips'),
    (1, 'Bear Canister', 'Camping', 16.5, 'oz', NULL),
    (1, 'Tent', 'Camping', 3, 'lbs', NULL);
