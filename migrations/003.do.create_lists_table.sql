CREATE TABLE lists (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  list_name TEXT NOT NULL,
  list_description TEXT,
);