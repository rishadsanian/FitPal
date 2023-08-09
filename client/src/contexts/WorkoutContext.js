// src/contexts/WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
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
  ////////////////////////////////STATES///////////////////////////////////////
  //Workout Form
  const [muscleGroups, setMuscleGroups] = useState(Object.keys(MUSCLE));
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weightLoad, setWeightLoad] = useState("");
  const [selectedExerciseDescription, setSelectedExerciseDescription] =
    useState("");
  //History
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentSlideindex, setCurrentSlideIndex] = useState(null);
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////FUNCTIONS///////////////////////////////////////

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
      // Check if response contains data

      if (response.data.length === 0) {
        handleSliderChange(currentSlideindex + 1);
        // If no data, set workoutHistory to an array with a placeholder entry
        const emptyWorkout = [
          {
            exercise_id: 999,
            exercise_name: "No workouts for that day",
            id: 99,
            session_id: 0,
            user_id: 4,
            resistance: 0, // Default resistance value
            reps: 0, // Default reps value
            timestamp: moment(currentDate).format("YYYY-MM-DD HH:mm:ss"), // Set timestamp to current date
          },
        ];
      } else {
        // If there's data, set workoutHistory with the response data
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
    setCurrentSlideIndex(index);
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
    currentSlideindex,
    setCurrentSlideIndex,
    handleEditWorkout,
    handleCancelEdit,
    handleDeleteWorkout,
    handleMuscleGroupSelection,
    handleExerciseSelection,
    handleSubmit,
  };

  return (
    <WorkoutContext.Provider value={contextValues}>
      {children}
    </WorkoutContext.Provider>
  );
}
