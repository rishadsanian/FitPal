INSERT INTO log (exercise_name, exercise_id, session_id, user_id, resistance, reps, timestamp) VALUES
  ('Dumbbell Bench Press', 1, 1, 3, 60, 10, NOW() - INTERVAL '5 weeks'),
  ('Dumbbell Flyes', 2, 1, 3, 45, 12, NOW() - INTERVAL '5 weeks'),
  ('Smith machine shrug', 7, 1, 3, 80, 8, NOW() - INTERVAL '5 weeks'),

  ('Incline dumbbell bench press', 3, 2, 3, 55, 10, NOW() - INTERVAL '3 weeks'),
  ('Low-cable cross-over', 4, 2, 3, 50, 12, NOW() - INTERVAL '3 weeks'),
  ('Leverage Shrug', 8, 2, 3, 90, 6, NOW() - INTERVAL '3 weeks'),

  ('Dumbbell Bench Press', 1, 3, 3, 65, 8, NOW() - INTERVAL '3 weeks'),
  ('Standing dumbbell shrug', 9, 3, 3, 70, 10, NOW() - INTERVAL '3 weeks'),
  ('Kettlebell sumo deadlift high pull', 11, 3, 3, 35, 15, NOW() - INTERVAL '3 weeks'),

    ('Decline Dumbbell Flyes', 6, 8, 3, 50, 10, NOW()),
  ('Kettlebell sumo deadlift high pull', 12, 8, 3, 40, 12, NOW()),
  ('Standing dumbbell upright row', 10, 8, 3, 45, 8, NOW());