DROP TABLE IF EXISTS profile CASCADE;

CREATE TABLE Profile (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  age INTEGER,
  height FLOAT,
  weight FLOAT,
  gender VARCHAR(10),
  program_id INTEGER NOT NULL
  timestamp TIMESTAMP DEFAULT NOW()

);