import ExerciseItem from "./ExerciseItem";

const SessionDetail = () => {
  return (
    <div>
       <h1 class="display-5 pt-3 fw-bold text-warning">Chest day</h1>
        <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          <ExerciseItem />
          <ExerciseItem />
          <ExerciseItem />
          <ExerciseItem />
          <ExerciseItem />
        </div>
    </div>
  );
};

export default SessionDetail;
