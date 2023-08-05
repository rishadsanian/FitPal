DROP TABLE IF EXISTS exercises CASCADE;

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  difficulty varchar(255),
  muscle varchar(255)
);