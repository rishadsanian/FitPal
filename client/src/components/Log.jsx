/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Log = () => {
  const mockMuscleData = [
    "Biceps",
    "Triceps",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Abs",
    "Glutes",
    "Calves",
    "Forearms",
    "Hamstrings",
    "Quadriceps",
  ];

  const mockExerciseData = [
    {
      name: "Push-ups",
      type: "bodyweight",
      muscle: "Chest",
      equipment: "None",
      difficulty: "beginner",
      instructions:
        "Assume a prone position on the floor with the hands palms down and aligned with the shoulders. The fingers should be pointed straight ahead. Execute by pushing the body up from the ground until the arms are fully extended.",
    },
    {
      name: "Pull-ups",
      type: "bodyweight",
      muscle: "Back",
      equipment: "Pull-up bar",
      difficulty: "intermediate",
      instructions:
        "Hang from a pull-up bar with an overhand grip, hands shoulder-width apart. Pull yourself up by squeezing your back muscles, bringing your chest toward the bar. Lower yourself back to the starting position with control.",
    },
    {
      name: "Squats",
      type: "strength",
      muscle: "Legs",
      equipment: "Barbell",
      difficulty: "beginner",
      instructions:
        "Stand with your feet shoulder-width apart, toes slightly turned out. Hold a barbell on your upper back. Bend your knees and lower your body, keeping your chest up and back straight. Go as low as you can, then push through your heels to stand back up.",
    },
    {
      name: "Dumbbell Shoulder Press",
      type: "strength",
      muscle: "Shoulders",
      equipment: "Dumbbells",
      difficulty: "intermediate",
      instructions:
        "Sit on a bench with back support, holding a dumbbell in each hand at shoulder level. Press the weights overhead, fully extending your arms. Lower the weights back to shoulder level with control.",
    },
    {
      name: "Bicep Curls",
      type: "strength",
      muscle: "Biceps",
      equipment: "Dumbbells",
      difficulty: "beginner",
      instructions:
        "Stand with dumbbells in your hands, palms facing forward. Curl the weights up toward your shoulders, keeping your elbows close to your body. Lower the weights back down with control.",
    },
  ];

  //STATES
  // will pull from api as an object or array to show choices from to choose from dropdown menu
  const [muscleGroups, setMuscleGroups] = useState(mockMuscleData);
  // {/* will  be the selcted musclegroup*/}
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  // will show the exercises from api as an object or array to show choices
  const [exercises, setExercises] = useState(mockExerciseData);
  // will save the selected exercise
  const [selectedExercise, setSelectedExercise] = useState("");
  //  record inputs from user
  const [reps, setReps] = useState("");
  // record input from user
  const [weightLoad, setWeightLoad] = useState("");
  //description of selected exercise

  const [selectedExerciseDescription, setSelectedExerciseDescription] =
    useState("");

  //useEffect to select exercises by muscle
  useEffect(() => {
    if (selectedMuscleGroup) {
      const filteredExercises = mockExerciseData.filter(
        (exercise) => exercise.muscle === selectedMuscleGroup
      );
      setExercises(filteredExercises);
    } else {
      // If no muscle group is selected, show all exercises
      setExercises(mockExerciseData);
    }
  }, [selectedMuscleGroup]);

  //useEffect to show selected exercise description
  useEffect(() => {
    if (selectedExercise) {
      const exercise = exercises.find((ex) => ex.name === selectedExercise);
      setSelectedExerciseDescription(exercise.instructions);
    } else {
      setSelectedExerciseDescription("");
    }
  }, [selectedExercise]);

  //selects muscle group for filtering
  const handleMuscleGroupSelection = (e) => {
    const selectedMuscle = e.target.value;
    setSelectedMuscleGroup(selectedMuscle);
  };

  //set selected exercise for the musclegroup
  const handleExerciseSelection = (e) => {
    setSelectedExercise(e.target.value);
  };

  //on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const logData = {
        exercise_name: selectedExercise,
        reps,
        resistance: weightLoad,
        // Add any other relevant data you want to send to the server
      };
  
      // Replace 'YOUR_API_URL' with the actual URL of your server API endpoint for logging workouts
      const response = await axios.post("/log", logData);
  
      console.log("Workout logged successfully:", response.data);
  
      // Clear form
      setSelectedMuscleGroup("");
      setSelectedExercise("");
      setReps("");
      setWeightLoad("");
    } catch (error) {
      console.error("Error logging workout:", error);
      // Handle error response if needed
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div
        className="container bg-dark text-white rounded py-5 px-3"
        style={{ width: "600px" }}
      >
        <h3 className="text-warning fw-bold">Workout Log</h3>
        <p className="text-secondary">{selectedExerciseDescription}</p>
        <form onSubmit={handleSubmit}>
          <div className="text-start">
            <label htmlFor="muscleGroup" className="form-label text-secondary">
              Muscle Group
            </label>
            <select
              id="muscleGroup"
              className="form-select"
              value={selectedMuscleGroup}
              onChange={handleMuscleGroupSelection}
              required
            >
              <option value="">Select Muscle Group</option>
              {muscleGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label htmlFor="exercise" className="form-label text-secondary">
              Exercise
            </label>
            <select
              id="exercise"
              className="form-select"
              value={selectedExercise}
              onChange={handleExerciseSelection}
              required
            >
              <option value="">Select Exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.name} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label htmlFor="reps" className="form-label text-secondary">
              Reps
            </label>
            <input
              type="number"
              className="form-control"
              id="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="text-start">
            <label htmlFor="weightLoad" className="form-label text-secondary">
              Weight Load (Resistance)
            </label>
            <input
              type="number"
              className="form-control"
              id="weightLoad"
              value={weightLoad}
              onChange={(e) => setWeightLoad(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="d-grid pt-3">
            <button type="submit" className="btn btn-warning">
              Log Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Log;
