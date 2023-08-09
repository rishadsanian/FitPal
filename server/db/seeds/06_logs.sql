INSERT INTO log (exercise_name, exercise_id, session_id, user_id, resistance, reps, timestamp) VALUES
  -- 7 days ago
  ('Dumbbell Bench Press', 1, 1, 4, 60, 10, NOW() - INTERVAL '7 days'),
  ('Dumbbell Flyes', 2, 1, 4, 45, 12, NOW() - INTERVAL '7 days'),
  ('Smith machine shrug', 7, 1, 4, 80, 8, NOW() - INTERVAL '7 days'),

  -- 6 days ago
  ('Incline dumbbell bench press', 3, 2, 4, 55, 10, NOW() - INTERVAL '6 days'),
  ('Low-cable cross-over', 4, 2, 4, 50, 12, NOW() - INTERVAL '6 days'),
  ('Leverage Shrug', 8, 2, 4, 90, 6, NOW() - INTERVAL '6 days'),

  -- 5 days ago
  ('Dumbbell Bench Press', 1, 3, 4, 65, 8, NOW() - INTERVAL '5 days'),
  ('Standing dumbbell shrug', 9, 3, 4, 70, 10, NOW() - INTERVAL '5 days'),
  ('Kettlebell sumo deadlift high pull', 11, 3, 4, 35, 15, NOW() - INTERVAL '5 days'),

  -- 4 days ago
  ('Decline Dumbbell Flyes', 6, 8, 4, 50, 10, NOW() - INTERVAL '4 days'),
  ('Kettlebell sumo deadlift high pull', 12, 8, 4, 40, 12, NOW() - INTERVAL '4 days'),
 

  -- 3 days ago
  ('Dumbbell Bench Press', 1, 1, 4, 60, 10, NOW() - INTERVAL '3 days'),
  ('Dumbbell Flyes', 2, 1, 4, 45, 12, NOW() - INTERVAL '3 days'),
  ('Smith machine shrug', 7, 1, 4, 80, 8, NOW() - INTERVAL '3 days'),

  -- 2 days ago
  ('Incline dumbbell bench press', 3, 2, 4, 55, 10, NOW() - INTERVAL '2 days'),
  ('Low-cable cross-over', 4, 2, 4, 50, 12, NOW() - INTERVAL '2 days'),


  -- 1 day ago
  ('Dumbbell Bench Press', 1, 3, 4, 65, 8, NOW() - INTERVAL '1 day'),
  ('Standing dumbbell shrug', 9, 3, 4, 70, 10, NOW() - INTERVAL '1 day'),
  ('Kettlebell sumo deadlift high pull', 11, 3, 4, 35, 15, NOW() - INTERVAL '1 day');
