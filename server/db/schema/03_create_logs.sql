DROP TABLE IF EXISTS log CASCADE;
CREATE TABLE log (
  id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(255) NOT NULL,
  exercise_id integer REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,
  session_id integer REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  resistance INTEGER NOT NULL CHECK (resistance > 0),
  reps INTEGER NOT NULL CHECK (reps > 0),
  timestamp TIMESTAMP DEFAULT NOW()
);
