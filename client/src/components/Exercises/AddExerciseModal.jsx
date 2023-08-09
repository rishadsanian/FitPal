/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSet from './AddSet';
import '../../styles/Modals.css';
import { useParams } from 'react-router-dom';

const MUSCLE = {
  abdominals: 'Abdominals',
  abductors: 'Abductors',
  adductors: 'Adductors',
  biceps: 'Biceps',
  calves: 'Calves',
  chest: 'Chest',
  forearms: 'Forearms',
  glutes: 'Glutes',
  hamstrings: 'Hamstrings',
  lats: 'Lats',
  lower_back: 'Lower Back',
  middle_back: 'Middle Back',
  neck: 'Neck',
  quadriceps: 'Quadriceps',
  traps: 'Traps',
  triceps: 'Triceps',
};

const MAX_SETS = 8;

const AddExerciseModal = (props) => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState([{ id: 0, weight: 0, reps: 0 }]);

  const { session_id } = useParams();

  // setup the initial states
  const setInitialValues = async () => {
    setSelectedMuscleGroup(props.muscle);
    await fetchExercisesByMuscle();
    setSelectedExercise(props.name);
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  // Fetch exercises from API based on the selected muscle group
  const fetchExercisesByMuscle = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_EXERCISE_API_URL, {
        headers: { 'X-Api-Key': process.env.REACT_APP_EXERCISE_API_KEY },
        params: { muscle: selectedMuscleGroup },
      });
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
    console.log(exercises);
  };

  useEffect(() => {
    fetchExercisesByMuscle();
  }, [selectedMuscleGroup]);

  const closeModal = async (e) => {
    e.preventDefault();
    props.setModalDisplay(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit set data to server
      for (const set of sets) {
        await axios.post(`/sets/session/${session_id}`, {
          sessionId: session_id,
          set,
          exerciseName: selectedExercise,
        });
      }
      // Navigate back to correct page after submitting
      // navigate(`/programs/${program_id}/sessions/${session_id}`);
      window.location.reload(true)
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  // ADDING AND REMOVING SETS
  const addSet = async (e) => {
    e.preventDefault();
    if (sets.length < MAX_SETS) {
      setSets((prev) => [
        ...prev,
        { id: sets.length, weight: 10, reps: 10 },
      ]);
    }
  };

  const removeSet = async (e) => {
    e.preventDefault();
    if (sets.length > 1) {
      setSets((prev) => {
        return [...prev.slice(0, sets.length - 1)];
      });
    }
  };

  return (
    <div>
      <div className="modal-background"></div>
      <div className="modal-foreground position-fixed top-50 start-50 translate-middle">
        <div
          className="container bg-dark text-white rounded p-3"
          style={{ width: '600px' }}
        >
          <div className="d-flex justify-content-between">
            {/* change to exercise name */}
            <h3 className="text-warning fw-bold">{selectedExercise}</h3>
            <button className="btn btn-dark end-0" onClick={closeModal}>
              <i className="fa-solid fa-x text-warning"></i>
            </button>
          </div>

          <p className="text-secondary text-start">
            add set and weight for each set
          </p>
          <form onSubmit={handleSubmit}>
            <div className="text-start">
              <label className="form-label text-secondary">Sets</label>

              {sets.map((set) => (
                <AddSet
                  key={set.id}
                  sets={sets}
                  id={set.id}
                  setSets={setSets}
                />
              ))}

              <div className="d-flex justify-content-between gap-2 mt-3">
                <button className="btn btn-outline-light flex-fill" onClick={addSet}>
                  <i className="fa-solid fa-plus fa-xs"></i>
                </button>
                <button className={sets.length === 1 ? "btn btn-outline-secondary flex-fill" : "btn btn-outline-light flex-fill"} onClick={removeSet} disabled={sets.length === 1}>
                  <i className="fa-solid fa-minus fa-xs"></i>
                </button>
              </div>
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
