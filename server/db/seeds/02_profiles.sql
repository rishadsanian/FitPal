INSERT INTO Profile (user_id, age, height, weight, gender, timestamp)
VALUES (1, 30, 180.5, 75.2, 'Male', NOW());

INSERT INTO Profile (user_id, age, height, weight, gender, timestamp)
VALUES (1, 35, 175.0, 80.0, 'Male', NOW() - INTERVAL '2 days');

INSERT INTO Profile (user_id, age, height, weight, gender, timestamp)
VALUES (2, 25, 165.3, 60.7, 'Female', NOW() - INTERVAL '1 week');

INSERT INTO Profile (user_id, age, height, weight, gender, timestamp)
VALUES (3, 28, 170.2, 68.5, 'Male', NOW() - INTERVAL '3 hours');

INSERT INTO Profile (user_id, age, height, weight, gender, timestamp)
VALUES (4, 31, 160.8, 55.3, 'Female', NOW() - INTERVAL '4 months');