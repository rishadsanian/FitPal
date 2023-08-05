DROP TABLE IF EXISTS exercises CASCADE;

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  instruction text,
  difficulty varchar(255),
  muscle_group varchar(255)
);