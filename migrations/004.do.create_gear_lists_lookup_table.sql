CREATE TABLE gear_lists_lookup (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE NOT NULL,
  gear_id INTEGER REFERENCES gear(id) ON DELETE CASCADE NOT NULL
);  