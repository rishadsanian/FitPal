/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSet from './AddSet';
import '../../styles/Modals.css';
import { useParams, useNavigate } from 'react-router-dom';

const MAX_SETS = 8;

const AddExerciseModal = (props) => {
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState([{ id: 0, weight: 0, reps: 0 }]);

  const navigate = useNavigate();
  const { program_id, session_id } = useParams();

  // setup the initial states
  const setInitialValues = async () => {
    setSelectedExercise(props.name);
  };

  useEffect(() => {
    setInitialValues();
    axios
      .get(`http://localhost:8080/sets/${session_id}/${props.name}`)
      .then((res) => {
        if (!res.error) {
          console.log(res.data.sets);
          
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
      window.location.reload(true);
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
                <button
                  className="btn btn-outline-light flex-fill"
                  onClick={addSet}
                >
                  <i className="fa-solid fa-plus fa-xs"></i>
                </button>
                <button
                  className={
                    sets.length === 1
                      ? 'btn btn-outline-secondary flex-fill'
                      : 'btn btn-outline-light flex-fill'
                  }
                  onClick={removeSet}
                  disabled={sets.length === 1}
                >
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
