// src/contexts/WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import moment from "moment";
import { userContext } from "./UserContext";
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
  shoulders: "Shoulders",
  traps: "Traps",
  triceps: "Triceps",
};

//TODO MOVE API KEY TO .ENV / USE NEW KEY/DELETE THIS ONE
const API_KEY = process.env.REACT_APP_EXERCISE_API_KEY;
const API_URL = "https://api.api-ninjas.com/v1/exercises";

// Provider component
export function WorkoutProvider({ children }) {
  // ----------------CONTEXT PROVIDERS-------------------------------------
  const { userId } = useContext(userContext);

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
  const [allWorkoutHistory, setAllWorkoutHistory] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));

  /////////////////////////////////CRUD Functions//////////////////////////////
  //Get history
  const fetchWorkoutHistory = async () => {
    try {
      const response = await axios.get(`/api/history/${userId}`, {
        params: {
          date: currentDate, // Send the current date as a parameter for SQL
        },
      });
      setWorkoutHistory(response.data);

    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  const fetchAllWorkoutHistory = async () => {
    try {
      const response = await axios.get(`/log/${userId}`);
      setAllWorkoutHistory(response.data.logs);

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
      setAllWorkoutHistory([...allWorkoutHistory.filter(workout => workout.id !== workoutId)])
      setWorkoutHistory([...workoutHistory.filter(workout => workout.id !== workoutId)])
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };
  //--------------------------------------------------------------------------//

  // Post workout
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const parsedWeightLoad = weightLoad === "" ? null : parseInt(weightLoad, 10);
      const logData = {
        exercise_name: selectedExercise.name,
        reps,
        resistance: parsedWeightLoad,
        user_id: userId, // replace with current user id prop
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
      fetchAllWorkoutHistory();
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
    console.log("selected muscle",selectedMuscle);
  };
  //--------------------------------------------------------------------------//
  // Slider handle to change to show different days
  const handleSliderChange = (index) => {
    const newDate = moment().subtract(index, "day").format("YYYY-MM-DD");
    setCurrentDate(newDate);
    console.log("index:", index);
  };
  //--------------------------------------------------------------------------//
  // Fetch exercises from API based on the selected muscle group
  const fetchExercises = async () => {
    try {
      const params = {};
      if (selectedExercise) {
        params.name = selectedExercise;
      }

      if (selectedMuscleGroup) {
        params.muscle = selectedMuscleGroup;
      }

      const response = await axios.get(API_URL, {
        headers: { "X-Api-Key": API_KEY },
        params: params,
      });
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };
  //--------------------------------------------------------------------------//
  //set selected exercise to updated selection
  const handleExerciseSelection = (e) => {
    setSelectedExercise(e.target.value);
    // fetchExercises();
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
    allWorkoutHistory,
    fetchAllWorkoutHistory,
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
    setExercises,
    fetchExercises
  };

  return (
    <WorkoutContext.Provider value={contextValues}>
      {children}
    </WorkoutContext.Provider>
  );
}
