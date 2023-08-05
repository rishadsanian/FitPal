DROP TABLE IF EXISTS sets CASCADE;

CREATE TABLE sets (
  id SERIAL PRIMARY KEY,
  session_id integer REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  exercise_id integer REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,
  reps smallserial NOT NULL,
  weigth real NOT NULL
);