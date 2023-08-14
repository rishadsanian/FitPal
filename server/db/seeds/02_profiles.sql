-- Weight Progress for User 4 (7-day weight changes in pounds)
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 121.78, 'Female', NOW() - INTERVAL '7 days');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 120.75, 120.75, 'Female', NOW() - INTERVAL '5 days');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 119.30, 'Female', NOW() - INTERVAL '3 days');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 116.50, 'Female', NOW() - INTERVAL '1 day');

-- Weight Progress for User 4 (1-month weight changes in pounds)
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 121.78, 'Female', NOW() - INTERVAL '1 month');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 119.30, 'Female', NOW() - INTERVAL '3 weeks');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 116.50, 'Female', NOW() - INTERVAL '2 weeks');

-- Weight Progress for User 4 (1-year weight changes in pounds)
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 121.78, 'Female', NOW() - INTERVAL '1 year');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 118.60, 'Female', NOW() - INTERVAL '9 months');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('4', '1992-08-06', 160.8, 116.00, 'Female', NOW() - INTERVAL '6 months');


--user 1
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('1', '1992-08-06', 160.8, 116.00, 'Male', NOW() - INTERVAL '6 months');


--user 2
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('2', '1992-08-06', 160.8, 116.00, 'Male', NOW() - INTERVAL '6 months');

INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('2', '1992-08-06', 160.8, 116.00, 'Male', NOW() - INTERVAL '5 months');

--user 3
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, timestamp)
VALUES ('3', '1992-08-06', 160.8, 116.00, 'Male', NOW() - INTERVAL '6 months');



--demo user
INSERT INTO Profile (
  user_id, date_of_birth, height, weight, gender, fitness_level, goal, program_id, timestamp
) VALUES (
  5, '1992-03-02', 170.8, 160, 'Male', 'Beginner', 'Bulk Up', NULL, '2023-02-14 06:51:02.423969'
);
-- Seed data for weight progress
-- Assuming user_id 5 for the demo user
-- We'll generate weight progress data twice every week for the past 6 months

-- Generate a series of dates for the past 6 months
WITH date_series AS (
  SELECT 
    generate_series(
      now() - interval '6 months',
      now(),
      interval '1 day'
    )::date AS measurement_date
),

-- Filter only those dates that are two consecutive days before the current week
filtered_dates AS (
  SELECT measurement_date
  FROM date_series
  WHERE EXTRACT(ISODOW FROM measurement_date) IN (
    EXTRACT(ISODOW FROM now() - interval '3 days'),
    EXTRACT(ISODOW FROM now() - interval '2 days')
  )
)

-- Seed weight progress data for the demo user
INSERT INTO Profile (user_id, date_of_birth, height, weight, gender, fitness_level, goal, timestamp)
SELECT
  5 AS user_id,
  '1992-03-02'::date AS date_of_birth,
  170.8 AS height,
  CASE
    WHEN filtered_dates.measurement_date = now() - interval '3 days' THEN 160
    ELSE 
      CASE
        WHEN random() > 0.5 THEN random() * 20 + 160 -- Increase weight
        ELSE random() * 20 + 140 -- Decrease weight
      END
  END AS weight,
  'Male' AS gender,
  'Beginner' AS fitness_level,
  'Bulk Up' AS goal,
  filtered_dates.measurement_date::timestamp -- Set timestamp to the measurement date
FROM filtered_dates;
