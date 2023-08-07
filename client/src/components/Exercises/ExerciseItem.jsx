import { useState, useEffect } from 'react';
import AddExerciseModal from "./AddExerciseModal"
import { useParams } from 'react-router';
import axios from 'axios';
const ExerciseItem = (props) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const exercise = props.exercise;

  const handleOnClick = () => {
    
    setModalDisplay(true)
    //find exercise by name in exercises table
    //if not have it 
    //  => add to exercises
    //  => add to sessions_exercises
    //  =>  how many weight and rep
    //  => mark added by changing icon
    //if have
    //  => check if sessions_exercises have this exercise for this session
    //  => if have
    //       =>  back to session page
    //  => if not
    //       =>  
  };

  return (
    <div className="col my-3">
      <div className="card bg-dark opacity-75 text-start">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="text-warning card-title">{exercise.name}</h5>
            <h6 className="card-subtitle text-secondary">
              {exercise.muscle}
            </h6>
          </div>
          {!props.userExercises.map((exercise) => exercise.name).includes(exercise.name) ? 
            <button className="btn btn-light" onClick={handleOnClick}>
              <i className="fa-solid fa-plus fa-xs"></i> 
            </button>
            :
            <button className="btn btn-light" disabled>
              <i className="fa-solid fa-check text-warning"></i> 
            </button>
          }
        </div>
        <div className="card-body">
          <p className="card-text text-white">
            {exercise.instructions || 'No instruction added yet.'}
          </p>
        </div>
        {props.sets &&< div className="card-footer d-flex flex-wrap justify-content-between gap-2">
          {props.sets.filter((set) => set.exercise_name === exercise.name).map((set) => <span className="badge text-bg-light">{set.resistant}lbs/{set.reps}</span>)}
        </div>}
      </div>
      {/* Create the excercise modal */}
      {modalDisplay && <AddExerciseModal name={exercise.name} muscle={exercise.muscle} setModalDisplay={setModalDisplay}/>}
      
    </div>
  );
};

export default ExerciseItem;
