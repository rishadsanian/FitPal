/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSet from "./AddSet"
import "../../styles/AddExerciseModal.css";
import { useParams, useNavigate } from "react-router-dom";

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
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedExerciseDescription, setSelectedExerciseDescription] = useState("");
  const [sets, setSets] = useState([{id: 0, weight: 0, reps: 0}])
  
  const navigate = useNavigate();
  const { program_id, session_id } = useParams();

  // setup the initial states
  const setInitialValues = async () => {
    setSelectedMuscleGroup(props.muscle); 
    await fetchExercisesByMuscle();
    setSelectedExercise(props.name);
  }

  useEffect(() => {
    setInitialValues();
  }, []);

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
    console.log(exercises)
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
    e.preventDefault();
    try {
      // Submit form data to the server
      const response = await axios.post(`/exercises/session/${session_id}`, {
        name: selectedExercise,
        muscle: selectedMuscleGroup,
        sessionId: session_id,
        sets
      });

      
      navigate(`/programs/${program_id}/sessions/${session_id}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }

    
  };

  // ADDING AND REMOVING SETS
  const addSet = async (e) => {
    e.preventDefault();
    if(sets.length < MAX_SETS) {
      setSets(prev => [...prev, {id: sets.length, weight: 10, reps: 10}])
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


  return (
    <div>

    <div className="add-excercise-modal-background">
    </div>
    <div className="position-fixed top-50 start-50 translate-middle z-2">
      
      <div
        
        className="container bg-dark text-white rounded py-5 px-3"
        style={{ width: "600px" }}
      >
        <h3 className="text-warning fw-bold">Add Excercise</h3>
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

            {sets.map((set) => <AddSet key={set.id} sets={sets} id={set.id} setSets={setSets}/>)}

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
    </div>
  );
};

export default AddExerciseModal;