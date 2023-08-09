/* eslint-disable react-hooks/exhaustive-deps */
// WorkoutForm.js
import { useEffect } from "react";
import React from "react";
import { useWorkoutContext } from "../../contexts/WorkoutContext";

import "../../styles/Log.css";
import axios from "axios";

const WorkoutForm = () => {
  const {
    MUSCLE,
    muscleGroups,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    exercises,
    selectedExercise,
    selectedExerciseDescription,
    reps,
    setReps,
    weightLoad,
    setWeightLoad,
    handleMuscleGroupSelection,
    handleExerciseSelection,
    handleSubmit,
    editingWorkout,
    handleCancelEdit,
    API_KEY,
    API_URL,
    setExercises,
    setSelectedExerciseDescription
  } = useWorkoutContext();

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


  return (
    <div
      className="container addlog bg-dark text-white rounded py-5 px-3"
      style={{ width: "600px" }}
    >
      <h3 className="text-warning fw-bold">Log Workout</h3>
      <div>
        {/* Exercise Details Section */}
        {!editingWorkout && selectedExercise && exercises.length > 0 && (
          <div>
            <p className="text-secondary">{selectedExerciseDescription}</p>
            <p className="text-secondary">
              <strong>Difficulty:</strong>{" "}
              {exercises[0].difficulty.toUpperCase()}
            </p>
            <p className="text-secondary">
              <strong>Type:</strong> {exercises[0].type.toUpperCase()}
            </p>
          </div>
        )}
        {editingWorkout && selectedExercise && (
          <h4 className="text-secondary">{selectedExercise}</h4>
        )}
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
          {/* Button for cancelling edit mode */}
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
  );
};

export default WorkoutForm;
