/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../styles/Log.css";

//data from external api so that it won't need api get request
//can be moved to application data
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
const API_KEY = "66MiBm26oAuvQnk8ovq1gQ==iBf7uenDV84EMsti";
const API_URL = "https://api.api-ninjas.com/v1/exercises";

//////////////////////////////////////////////////////////////////Set states
const Log = () => {
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

  ///////////////////////////////////////////////////////////////WORKOUT HISTORY
  //Get history

  const fetchWorkoutHistory = async () => {
    try {
      const response = await axios.get(`/api/history/4`, {
        params: {
          date: moment().format("YYYY-MM-DD"), // Send the current date as a parameter for sql
        },
      }); // Replace 4 with current user id
      setWorkoutHistory(response.data);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);
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

  //--------------------------------------------------------------------------//
  const handleCancelEdit = () => {
    setSelectedExercise("");
    setReps("");
    setWeightLoad("");
    setEditingWorkout(null);
  };
  //--------------------------------------------------------------------------//
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

  ///////////////////////////////////////////////////////////////WORKOUT LOG
  useEffect(() => {
    // Use Select Muscle group as the first option in dropdown menu
    if (muscleGroups.length > 0) {
      const firstMuscleGroup = "Select Muscle Group";
      setSelectedMuscleGroup(firstMuscleGroup);
    }
  }, [muscleGroups]);

  useEffect(() => {
    // Fetch exercises from API based on the selected muscle group
    const fetchExercisesByMuscle = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { "X-Api-Key": API_KEY },
          params: { muscle: selectedMuscleGroup },
        });
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercisesByMuscle();
  }, [selectedMuscleGroup, selectedExerciseDescription, selectedExercise]);

  useEffect(() => {
    //load exercise from api response and account for any changes
    const exercise = exercises.find((ex) => ex.name === selectedExercise);
    //Dynamic display to show instructions for each exercise or null if no exercise is selected
    setSelectedExerciseDescription(exercise?.instructions || "");
  }, [selectedExercise]);
  //allow for browsing through different exercises
  const handleMuscleGroupSelection = (e) => {
    const selectedMuscle = e.target.value;
    setSelectedMuscleGroup(selectedMuscle);
  };

  //set selected exercise to updated selection
  const handleExerciseSelection = (e) => {
    setSelectedExercise(e.target.value);
  };
  ////////////////////////////////////////////////////////////////////////
  // On submit
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
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <div className="log container">
      <div
        className="container addlog bg-dark text-white rounded py-5 px-3"
        style={{ width: "600px" }}
      >
        <h3 className="text-warning fw-bold">Workout Log</h3>
        <div>
          <p className="text-secondary"></p>
          <p className="text-secondary">
            {selectedExercise && exercises.length > 0 && (
              <div>
                <p>{selectedExerciseDescription}</p>
                <p>
                  <strong>Difficulty:</strong>{" "}
                  {exercises[0].difficulty.toUpperCase()}
                </p>
                <p>
                  <strong>Type:</strong> {exercises[0].type.toUpperCase()}
                </p>
              </div>
            )}
          </p>
        </div>
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
              // required
            >
              <option value="">Select Muscle Group</option>
              {muscleGroups.map((group) => (
                <option key={group} value={group}>
                  {MUSCLE[group]}
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
              // required
            >
              <option value="">Select Exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.name} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row row-cols-sm-2 pt-4">
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Weight
                </span>
                <input
                  type="number"
                  id="weightLoad"
                  value={weightLoad}
                  onChange={(e) => setWeightLoad(e.target.value)}
                  required
                  min="1"
                  className="form-control form-control-lg"
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Reps
                </span>
                <input
                  type="number"
                  id="reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                  min="1"
                  className="form-control form-control-lg"
                />
              </div>
            </div>
          </div>
          {/* submit - depend on edit or log mode */}
          <div className="form-buttons-container">
            <button type="submit" className="btn btn-warning">
              {editingWorkout ? "Update" : "Log Workout"}
            </button>
            {editingWorkout && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      {/* //----------------------------------------------- workout history */}
      {/* Workout History */}
      <div
        className="workout-history container addlog bg-dark text-white rounded py-5 px-3"
        style={{ width: "600px" }}
      >
        <h2>Workout History (Today)</h2>
        {workoutHistory.length === 0 ? (
          <p>No workouts recorded for today.</p>
        ) : (
          <div>
            {/* show workout items from sql response */}
            {workoutHistory.map((workout) => (
              <div
                key={workout.id}
                className="workout-entry border rounded p-3 mb-2"
              >
                <p>
                  <strong>Date:</strong>{" "}
                  {moment(workout.timestamp).format("MMMM D, YYYY")}
                </p>
                <p>
                  <strong>Exercise:</strong> {workout.exercise_name}
                </p>
                <p>
                  <strong>Reps:</strong> {workout.reps}
                </p>
                <p>
                  <strong>Weight Load:</strong> {workout.resistance}
                </p>
                <button
                  onClick={() => handleEditWorkout(workout)}
                  disabled={editingWorkout === workout}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="btn btn-sm btn-warning"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Log;
