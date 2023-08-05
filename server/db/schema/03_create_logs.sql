CREATE TABLE log (
  id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(100) NOT NULL,
  exercise_id INTEGER,
  session_id INTEGER,
  user_id INTEGER,
  resistance INTEGER NOT NULL CHECK (resistance > 0),
  reps INTEGER NOT NULL CHECK (reps > 0),
  timestamp TIMESTAMP DEFAULT NOW()
);
