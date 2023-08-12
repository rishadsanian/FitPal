/* eslint-disable react-hooks/exhaustive-deps */
// WorkoutForm.js
import { useEffect, useState } from "react";
import React from "react";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import "../../styles/Log.css";
import axios from "axios";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Autocomplete,
} from "@mui/material";

import ExerciseDetailModal from "../Exercises/ExerciseDetailModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const WorkoutForm = () => {
  const {
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
    handleExerciseSelection,
    handleSubmit,
    editingWorkout,
    handleCancelEdit,
    API_KEY,
    API_URL,
    setExercises,
  } = useWorkoutContext();

  const [readMore, setReadMore] = useState(false);

  const [modalDisplay, setModalDisplay] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    // Use Select Muscle group as the first option in dropdown menu
    if (muscleGroups.length > 0) {
      const firstMuscleGroup = "Select Muscle Group";
      setSelectedMuscleGroup(firstMuscleGroup);
    }
  }, [muscleGroups]);

  if (muscleGroups.length === 0) {
    setExercises([""]);
  }

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

  return (
    <div className="addlog text-white bg-dark-50 p-5 rounded">
      <h3 className="text-warning fw-bold">Log Workout</h3>
      <div>
        {/* Exercise Details Section */}
        {!editingWorkout && selectedExercise && exercises.length > 0 && (
          <div></div>
        )}
        {editingWorkout && selectedExercise && (
          <h4 className="text-secondary">{selectedExercise}</h4>
        )}
      </div>
      <div
        pt-0
        pb-0
        m-0
        border
        bg-dark
        border-secondary
        bs-border-opacity-75
        rounded
        flex-column
        border-3
      >
        <ThemeProvider theme={darkTheme}>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              {!editingWorkout && (
                <div className="text-start mb-3">
                  <Autocomplete
                    id="muscleGroup"
                    options={muscleGroups.map(
                      (group) => group.charAt(0).toUpperCase() + group.slice(1)
                    )}
                    value={selectedMuscleGroup || ""}
                    onChange={(_, newValue) =>
                      setSelectedMuscleGroup(
                        newValue === "Select Muscle Group" ? null : newValue
                      )
                    }
                    getOptionLabel={(group) => group}
                    // isOptionEqualToValue={(option, value) => option === value}
                    fullWidth
                    sx={{
                      // backgroundColor: '#343a40',
                      // text: "warning",
                      // boxShadow: 1,
                      borderRadius: 2,
                      p: 0,
                      minWidth: 100,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Muscle Group"
                        variant="outlined"
                        placeholder="Select Muscle Group"
                        sx={{
                          color: "white",
                          borderColor: "#ffc107",
                          bgcolor: "rgba(52, 58, 64, 0.75)",
                          "&:hover": {
                            borderColor: "#ffc107", // Change the border color on hover
                          },
                        }}
                      />
                    )}
                  />
                </div>
              )}
              {!editingWorkout && (
                <div className="text-start mb-3">
                  <Autocomplete
                    id="exercise"
                    options={exercises}
                    value={selectedExercise || ""}
                    onChange={(_, newValue) =>
                      handleExerciseSelection({ target: { value: newValue } })
                    }
                    getOptionLabel={(exercises) =>
                      exercises.name || "Select Exercise"
                    }
                    fullWidth
                    sx={{
                      // bgcolor: "background.paper",
                      // text: "warning",
                      // boxShadow: 1,
                      borderRadius: 2,
                      p: 0,
                      minWidth: 100,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Exercise"
                        variant="outlined"
                        placeholder="Select Exercise"
                        sx={{
                          color: "white",
                          borderColor: "#ffc107",
                          bgcolor: "rgba(52, 58, 64, 0.75)",
                          "&:hover": {
                            borderColor: "#ffc107", // Change the border color on hover
                          },
                        }}
                      />
                    )}
                  />
                </div>
              )}
              {!editingWorkout && selectedExercise && exercises.length > 0 && (
                <p className="text-secondary text-end">
                  {!readMore && selectedExercise && (
                    <span
                      className="badge text-bg-warning me-2 pt-1"
                      onClick={() => setModalDisplay(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Show Details
                    </span>
                  )}
                </p>
              )}
              <div className="row row-cols-sm-2 pt-0">
                <div className="col">
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text bg-dark opacity-75 text-warning fw-bold border-secondary border-3" id="addon-wrapping">
                      Weight
                    </span>
                    <input
                      type="number"
                      id="weightLoad"
                      value={weightLoad}
                      onChange={(e) => setWeightLoad(e.target.value)}
                      required
                      min="1"
                      className="form-control form-control-lg text-white  border-secondary border-3 bg-dark opacity-75"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text bg-dark opacity-75 text-warning fw-bold border-secondary border-3" id="addon-wrapping">
                      Reps
                    </span>
                    <input
                      type="number"
                      id="reps"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      required
                      min="1"
                      className="form-control form-control-lg text-white  border-secondary border-3 bg-dark opacity-75"
                    />
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-warning mt-4 text-dark fw-bold"
                >
                  {editingWorkout ? "Update" : "Log Workout"}
                </button>
                {editingWorkout && (
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </Container>
        </ThemeProvider>
      </div>
      {modalDisplay && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          setExerciseDetailDisplay={setModalDisplay}
        />
      )}
    </div>
  );
};

export default WorkoutForm;
