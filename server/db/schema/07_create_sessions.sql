DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  program_id integer REFERENCES programs(id) ON DELETE CASCADE NOT NULL
);