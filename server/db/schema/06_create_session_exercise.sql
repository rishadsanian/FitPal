DROP TABLE IF EXISTS sessions_exercises CASCADE;

CREATE TABLE sessions_exercises (
  id SERIAL PRIMARY KEY,
  session_id integer REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  exercise_id integer REFERENCES exercises(id) ON DELETE CASCADE NOT NULL
);