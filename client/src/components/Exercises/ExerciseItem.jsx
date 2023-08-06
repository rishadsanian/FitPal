import { useState } from 'react';


const ExerciseItem = (props) => {
  const [icon, setIcon] = useState("fa-solid fa-plus fa-xs");
  const exercise = props.exercise;

  const handleOnClick = () => {
    setIcon("fa-solid fa-check text-warning");
    //find exercise by name in exercises table
    //if not have it 
    //  => add to exercises
    //  => add to sessions_exercises
    //  =>  how many weight and rep
    //  => mark added by changing icon
    //if have
    //  => check if sessions_exercises have this exercise for this session
    //  => if have
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
          <button className="btn btn-light" onClick={handleOnClick}>
             <i className={icon}></i>
          </button>
        </div>
        <div className="card-body">
          <p className="card-text text-white">
            {exercise.instructions || 'No instruction added yet.'}
          </p>
        </div>
        <div className="card-footer d-flex flex-wrap justify-content-between gap-2">
          <span className="badge text-bg-light">45lsb/8</span>
          <span className="badge text-bg-light">70lsb/8</span>
          <span className="badge text-bg-light">80lsb/6</span>
          <span className="badge text-bg-light">90lsb/5</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;
