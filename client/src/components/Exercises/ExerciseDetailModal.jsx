const ExerciseDetailModal = (props) => {
  const exercise = props.exercise;
  const closeModal = async (e) => {
    e.preventDefault();
    props.setExerciseDetailDisplay(false);
  };
  const capitalizeFirstLetter = (str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="">
      <div className="modal-background"></div>
      <div className="modal-foreground position-fixed top-50 start-50 translate-middle col col-11 col-md-7 col-xl-5 border border-warning rounded-3">
        <div className="bg-dark text-white rounded p-5">
          <div className="modal-header">
            <h3 className="text-warning">{exercise.name}</h3>
            <button className="btn btn-dark end-0" onClick={closeModal}>
              <i className="fa-solid fa-x text-warning"></i>
            </button>
          </div>
          <div className="text-start modal-body">
            <p className="text-secondary p-0 mb-0">
              Muscle: {capitalizeFirstLetter(exercise.muscle)} | Level: {capitalizeFirstLetter(exercise.difficulty)}
            </p>
            <p className="text-secondary">
              Type: {capitalizeFirstLetter(exercise.type)} | Equipment: {capitalizeFirstLetter(exercise.equipment)}
            </p>
            <p>{exercise.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExerciseDetailModal;
