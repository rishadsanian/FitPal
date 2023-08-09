// src/contexts/WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import WorkoutHistory from "../components/Log/WorkoutHistory";
import WorkoutForm from "../components/Log/WorkoutForm.jsx";
const WorkoutContext = createContext();

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

//TODO MOVE API KEY TO .ENV / USE NEW KEY/DELETE THIS ONE
const API_KEY = "Fj2LIBjGKtBSKvtmbX2ZASJH9NzxyqednyyPebSu";
const API_URL = "https://api.api-ninjas.com/v1/exercises";

// Provider component
export function WorkoutProvider({ children }) {
  ////////////////////////////////STATES///////////////////////////////////////
  //  work out form
  const [muscleGroups, setMuscleGroups] = useState(Object.keys(MUSCLE));
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weightLoad, setWeightLoad] = useState("");
  const [selectedExerciseDescription, setSelectedExerciseDescription] =
    useState("");
  // history
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));

  /////////////////////////////////CRUD Functions//////////////////////////////
  //Get history
  const fetchWorkoutHistory = async () => {
    try {
      const response = await axios.get(`/api/history/4`, {
        params: {
          date: currentDate, // Send the current date as a parameter for SQL
        },
      }); // Replace 4 with the current user id
      console.log("fetchworkouthistory:", response.data);
  
      if (response.data.length === 0) {
        const placeholderWorkout = {
          id: 0,
          exercise_name: "No workouts recorded",
          exercise_id: 0,
          session_id: 0,
          user_id: 0,
          resistance: 0,
          reps: 0,
          timestamp: moment(),
        };
  
        setWorkoutHistory([placeholderWorkout]);
      } else {
        setWorkoutHistory(response.data);
      }
  
      console.log("current date after fetchWorkout history:", currentDate);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  
  
  
  
  

  //--------------------------------------------------------------------------//
  //Edit  workout
  const handleEditWorkout = (workout) => {
    setSelectedMuscleGroup(workout.muscle_group);
    setSelectedExercise(workout.exercise_name);
    // setSelectedExerciseDescription(workout.exercise_name.)
    setReps(workout.reps);
    setWeightLoad(workout.resistance);
    setEditingWorkout(workout);
  };

  //Delete workout
  const handleDeleteWorkout = async (workoutId) => {
    try {
      await axios.delete(`/delete/log/${workoutId}`);
      // update workout history after deleting
      fetchWorkoutHistory();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };
  //--------------------------------------------------------------------------//

  // Post workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logData = {
        exercise_name: selectedExercise,
        reps,
        resistance: weightLoad,
        user_id: 4, // replace with current user id prop
      };

      if (editingWorkout) {
        // If edit mode, perform an update operation
        const response = await axios.put(
          `/update/log/${editingWorkout.id}`,
          logData
        );
        console.log("Workout updated successfully:", response.data);
      } else {
        // create operation
        const response = await axios.post("/log", logData);
        console.log("Workout logged successfully:", response.data);
      }

      // Clear form and editingWorkout state
      setReps("");
      setWeightLoad("");
      setSelectedExercise("");
      setEditingWorkout(null);

      // Refresh workout history
      fetchWorkoutHistory();
    } catch (error) {
      console.error("Error logging workout:", error);
    }
  };
  //--------------------------------------------------------------------------//
  //Other Functions

  //Cancel Edit
  const handleCancelEdit = () => {
    setSelectedExercise("");
    setReps("");
    setWeightLoad("");
    setEditingWorkout(null);
  };
  //--------------------------------------------------------------------------//
  //allow for browsing through different exercises
  const handleMuscleGroupSelection = (e) => {
    const selectedMuscle = e.target.value;
    setSelectedMuscleGroup(selectedMuscle);
  };
  //--------------------------------------------------------------------------//
  // Slider handle to change to show different days
  const handleSliderChange = (index) => {
    const newDate = moment().subtract(index, "day").format("YYYY-MM-DD");
    setCurrentDate(newDate);
    console.log("index:", index);
  };
  //--------------------------------------------------------------------------//
  //set selected exercise to updated selection
  const handleExerciseSelection = (e) => {
    setSelectedExercise(e.target.value);
  };

  useEffect(() => {
    // Initialize muscle groups here or fetch them from an API
    const initialMuscleGroups = Object.keys(MUSCLE);
    setMuscleGroups(initialMuscleGroups);
  }, []);

  // Define context values
  const contextValues = {
    MUSCLE,
    muscleGroups,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    exercises,
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
    handleEditWorkout,
    handleCancelEdit,
    handleDeleteWorkout,
    handleMuscleGroupSelection,
    handleExerciseSelection,
    handleSubmit,
    handleSliderChange,
    fetchWorkoutHistory,
    API_KEY,
    API_URL,
    WorkoutHistory,
    WorkoutForm,
    setExercises
  };

  return (
    <WorkoutContext.Provider value={contextValues}>
      {children}
    </WorkoutContext.Provider>
  );
}
