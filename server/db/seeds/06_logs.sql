INSERT INTO log (exercise_name, user_id, resistance, reps, timestamp) VALUES
  -- 7 days ago
  ('Dumbbell Bench Press', 4, 60, 10, NOW() - INTERVAL '7 days'),
  ('Dumbbell Flyes', 4, 45, 12, NOW() - INTERVAL '7 days'),
  ('Smith machine shrug', 4, 80, 8, NOW() - INTERVAL '7 days'),

  -- 6 days ago
  ('Incline dumbbell bench press',4, 55, 10, NOW() - INTERVAL '6 days'),
  ('Low-cable cross-over',4, 50, 12, NOW() - INTERVAL '6 days'),
  ('Leverage Shrug',4, 90, 6, NOW() - INTERVAL '6 days'),

  -- 5 days ago
  ('Dumbbell Bench Press',4, 65, 8, NOW() - INTERVAL '5 days'),
  ('Standing dumbbell shrug',4, 70, 10, NOW() - INTERVAL '5 days'),
  ('Kettlebell sumo deadlift high pull',4, 35, 15, NOW() - INTERVAL '5 days'),

  -- 4 days ago
  ('Decline Dumbbell Flyes',4, 50, 10, NOW() - INTERVAL '4 days'),
  ('Kettlebell sumo deadlift high pull',4, 40, 12, NOW() - INTERVAL '4 days'),
 

  -- 3 days ago
  ('Dumbbell Bench Press',4, 60, 10, NOW() - INTERVAL '3 days'),
  ('Dumbbell Flyes',4, 45, 12, NOW() - INTERVAL '3 days'),
  ('Smith machine shrug',4, 80, 8, NOW() - INTERVAL '3 days'),

  -- 2 days ago
  ('Incline dumbbell bench press',4, 55, 10, NOW() - INTERVAL '2 days'),
  ('Low-cable cross-over',4, 50, 12, NOW() - INTERVAL '2 days'),


  -- 1 day ago
  ('Dumbbell Bench Press',4, 65, 8, NOW() - INTERVAL '1 day'),
  ('Standing dumbbell shrug',4, 70, 10, NOW() - INTERVAL '1 day'),
  ('Kettlebell sumo deadlift high pull',4, 35, 15, NOW() - INTERVAL '1 day');
