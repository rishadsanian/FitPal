/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
} from "@mui/material";

// {/* /////////////////////////////////////////////////////////LOG FORM////////////// */}

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

  // {/* will pull from api as an object or array to show choices from to choose from dropdown menu*/}
  const [muscleGroups, setMuscleGroups] = useState(mockMuscleData);
  // {/* will  be the selcted musclegroup*/}
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  // {/* will show the exercises from api as an object or array to show choices */}
  const [exercises, setExercises] = useState(mockExerciseData);
  // {/* will save the selected exercise */}
  const [selectedExercise, setSelectedExercise] = useState("");
  // {/* record inputs from user */}
  const [reps, setReps] = useState("");
  // {/* record input from user */}
  const [weightLoad, setWeightLoad] = useState("");

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

  const handleMuscleGroupSelection = (e) => {
    const selectedMuscle = e.target.value;
    setSelectedMuscleGroup(selectedMuscle);

    // if (selectedMuscleGroup) {
    //   const filteredExercises = mockExerciseData.filter(
    //     (exercise) => exercise.muscle === selectedMuscleGroup
    //   );
    //   setExercises(filteredExercises);
    // } else {
    //   // If no muscle group is selected, show all exercises
    //   setExercises(mockExerciseData);
    // }
  };

  //set selected exercise
  const handleExerciseSelection = (e) => {
    setSelectedExercise(e.target.value);
  };

  //on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "Workout:",
      selectedMuscleGroup,
      " ",
      selectedExercise,
      reps,
      weightLoad
    );

    //Clear form
    setSelectedMuscleGroup("");
    setSelectedExercise("");
    setReps("");
    setWeightLoad("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <h1>Workout Log</h1>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel htmlFor="muscleGroup">Muscle Group</InputLabel>
              <Select
                label="Muscle Group"
                value={selectedMuscleGroup}
                onChange={handleMuscleGroupSelection}
              >
                <MenuItem value="">Select Muscle Group</MenuItem>
                {muscleGroups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel htmlFor="exercise">Exercise</InputLabel>
              <Select
                label="Exercise"
                value={selectedExercise}
                onChange={handleExerciseSelection}
              >
                <MenuItem value="">Select Exercise</MenuItem>
                {exercises.map((exercise) => (
                  <MenuItem key={exercise.name} value={exercise.name}>
                    {exercise.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Reps"
              type="number"
              variant="outlined"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Weight Load (Resistance)"
              type="number"
              variant="outlined"
              value={weightLoad}
              onChange={(e) => setWeightLoad(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor:
                  "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))",
                "&:hover": {
                  backgroundColor:
                    "slategray",
                },
              }}
            >
              Log Workout
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Log;
