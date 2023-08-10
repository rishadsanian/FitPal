DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  day_of_week INTEGER NOT NULL,
  program_id integer REFERENCES programs(id) ON DELETE CASCADE NOT NULL
);