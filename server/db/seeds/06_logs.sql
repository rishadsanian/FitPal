INSERT INTO log (exercise_name, exercise_id, session_id, user_id, resistance, reps, timestamp) VALUES
  ('Dumbbell Bench Press', 1, 1, 4, 60, 10, NOW() - INTERVAL '5 weeks'),
  ('Dumbbell Flyes', 2, 1, 4, 45, 12, NOW() - INTERVAL '5 weeks'),
  ('Smith machine shrug', 7, 1, 4, 80, 8, NOW() - INTERVAL '5 weeks'),

  ('Incline dumbbell bench press', 3, 2, 4, 55, 10, NOW() - INTERVAL '3 weeks'),
  ('Low-cable cross-over', 4, 2, 4, 50, 12, NOW() - INTERVAL '3 weeks'),
  ('Leverage Shrug', 8, 2, 4, 90, 6, NOW() - INTERVAL '3 weeks'),

  ('Dumbbell Bench Press', 1, 3, 4, 65, 8, NOW() - INTERVAL '3 weeks'),
  ('Standing dumbbell shrug', 9, 3, 4, 70, 10, NOW() - INTERVAL '3 weeks'),
  ('Kettlebell sumo deadlift high pull', 11, 3, 4, 35, 15, NOW() - INTERVAL '3 weeks'),

  ('Decline Dumbbell Flyes', 6, 8, 4, 50, 10, NOW()),
  ('Kettlebell sumo deadlift high pull', 12, 8, 4, 40, 12, NOW()),
  ('Standing dumbbell upright row', 10, 8, 4, 45, 8, NOW()),

  ('Dumbbell Bench Press', 1, 1, 4, 60, 10, NOW() - INTERVAL '4 days'),
  ('Dumbbell Flyes', 2, 1, 4, 45, 12, NOW() - INTERVAL '3 days'),
  ('Smith machine shrug', 7, 1, 4, 80, 8, NOW() - INTERVAL '2 days'),
  ('Incline dumbbell bench press', 3, 2, 4, 55, 10, NOW() - INTERVAL '1 day'),
  ('Low-cable cross-over', 4, 2, 4, 50, 12, NOW() - INTERVAL '1 day'),
  ('Leverage Shrug', 8, 2, 4, 90, 6, NOW() - INTERVAL '1 day'),
  ('Dumbbell Bench Press', 1, 3, 4, 65, 8, NOW() - INTERVAL '1 day'),
  ('Standing dumbbell shrug', 9, 3, 4, 70, 10, NOW() - INTERVAL '1 day'),
  ('Kettlebell sumo deadlift high pull', 11, 3, 4, 35, 15, NOW() - INTERVAL '1 day');
