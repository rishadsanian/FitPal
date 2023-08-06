/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSet from "./AddSet"

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

const MAX_SETS = 4;

const API_KEY = "66MiBm26oAuvQnk8ovq1gQ==iBf7uenDV84EMsti";
const API_URL = "https://api.api-ninjas.com/v1/exercises";

const AddExerciseModal = (props) => {
  const [muscleGroups, setMuscleGroups] = useState(Object.keys(MUSCLE)); 
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(MUSCLE[props.muscle]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(props.name);
  const [selectedExerciseDescription, setSelectedExerciseDescription] = useState("");
  const [setCount, setSetCount] = useState(1);
  const [sets, setSets] = useState([{id: 0, weight: 0, reps: 0}])

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
  
  useEffect(() => {
    fetchExercisesByMuscle();
  }, [selectedMuscleGroup]);

  useEffect(() => {
    // Set exercise description based on the selected exercise
    const exercise = exercises.find((ex) => ex.name === selectedExercise);
    setSelectedExerciseDescription(exercise?.instructions || "");
  }, [selectedExercise]);

  const handleMuscleGroupSelection = (e) => {
    const selectedMuscle = e.target.value;
    setSelectedMuscleGroup(selectedMuscle);
  };

  const handleExerciseSelection = (e) => {
    setSelectedExercise(e.target.value);
  };

  const handleSubmit = async (e) => {
  };

  // ADDING AND REMOVING SETS
  const addSet = async (e) => {
    e.preventDefault();
    if(sets.length < MAX_SETS) {
      setSets(prev => [...prev, {id: sets.length, weight: 0, reps: 0}])
    }
  }

  const removeSet = async (e) => {
    e.preventDefault();
    if(sets.length > 1) {
      setSets(prev => {
        return [...prev.slice(0, sets.length - 1)];
      })
    }
  }

  const setsToDisplay = sets.map((set) => <AddSet sets={sets} id={set.id} setSets={setSets}/>)

  return (
    <div className="position-fixed top-50 start-50 translate-middle z-1">
      <div
        className="container bg-dark text-white rounded py-5 px-3"
        style={{ width: "600px" }}
      >
        <h3 className="text-warning fw-bold">Add Excercise</h3>
        <h4>{selectedExercise}</h4>
        <h4>{selectedMuscleGroup}</h4>
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
              {muscleGroups.map((group) => (
                <option key={group} value={group}>
                  {MUSCLE[group]} {/* Use the value of the MUSCLE object */}
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
              {exercises.map((exercise) => (
                <option key={exercise.name} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-start">
            <label className="form-label text-secondary">
              Sets
            </label>

            {setsToDisplay}

            {sets.length > 1 ?
              <div className="d-grid pt-3">
                <button className="btn btn-light" onClick={addSet}>
                  <i className="fa-solid fa-plus fa-xs"></i>
                </button>
                <button className="btn btn-light" onClick={removeSet}>
                  <i className="fa-solid fa-minus fa-xs"></i>
                </button>
              </div>
             : <div className="d-grid pt-3">
              <button className="btn btn-light" onClick={addSet}>
                <i className="fa-solid fa-plus fa-xs"></i>
              </button>
            </div>
            }
            
          </div>
          <div className="d-grid pt-3">
            <button type="submit" className="btn btn-warning">
              Add Excercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExerciseModal;