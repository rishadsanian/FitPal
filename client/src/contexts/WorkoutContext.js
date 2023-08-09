// src/contexts/WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import moment from "moment";
// Create a context
const WorkoutContext = createContext();

// Custom hook to use the context
export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};

const MUSCLE = {
  abdominals: "Abdominals",
  abductors: "Abductors",
  adductors: "Adductors",
  biceps: "Biceps",
  calves: "Calves",
  chest: "Chest",
  forearms: "Forearms",
  glutes: "Glutes",
  hamstrings: "Hamstrings",
  lats: "Lats",
  lower_back: "Lower Back",
  middle_back: "Middle Back",
  neck: "Neck",
  quadriceps: "Quadriceps",
  traps: "Traps",
  triceps: "Triceps",
};

// Provider component
export function WorkoutProvider({ children }) {
  const [muscleGroups, setMuscleGroups] = useState(Object.keys(MUSCLE));
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weightLoad, setWeightLoad] = useState("");
  const [selectedExerciseDescription, setSelectedExerciseDescription] =
    useState("");

  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentSlideindex, setCurrentSlideIndex] = useState(null);

  useEffect(() => {
    // Initialize muscle groups here or fetch them from an API
    const initialMuscleGroups = Object.keys(MUSCLE);
    setMuscleGroups(initialMuscleGroups);
  }, []);

  // Define context values
  const contextValues = {
    muscleGroups,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    exercises,
    setExercises,
    selectedExercise,
    setSelectedExercise,
    reps,
    setReps,
    weightLoad,
    setWeightLoad,
    selectedExerciseDescription,
    setSelectedExerciseDescription,
    workoutHistory,
    setWorkoutHistory,
    editingWorkout,
    setEditingWorkout,
    currentDate,
    setCurrentDate,
    currentSlideindex,
    setCurrentSlideIndex,
  };

  return (
    <WorkoutContext.Provider value={contextValues}>
      {children}
    </WorkoutContext.Provider>
  );
}
