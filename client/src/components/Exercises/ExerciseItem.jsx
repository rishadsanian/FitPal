const ExerciseItem = (props) => {

  const exercise = props.exercise;
  return (
    <div className="col my-3">
      <div className="card bg-dark opacity-75 text-start">
        <div className="card-header">
          <h5 className="text-warning card-title">{exercise.name}</h5>
          <h6 className="card-subtitle text-secondary">{exercise.muscle}</h6>
        </div>
        <div className="card-body">
          <p className="card-text text-white">
            {exercise.instructions.substring(0, 200) + `...`}
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
