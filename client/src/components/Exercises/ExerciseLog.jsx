import SetRecord from './SetRecord';

const ExerciseLog = () => {
  return (
    <div className="pt-3">
      <h1 className="text-warning pb-3">Barbell bench press</h1>
      <SetRecord />
      <SetRecord />
      <SetRecord />
      <SetRecord />

      <div className="d-grid gap-2 pb-3">
        <button className="btn btn-outline-warning btn-large p-3 m-3 fill">
          Save
        </button>
      </div>
    </div>
  );
};

export default ExerciseLog;
