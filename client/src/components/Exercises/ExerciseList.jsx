import { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseItem from './ExerciseItem';

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

const API = 'Q+047KH3H18VkQk32d7afg==Yfc8QaQSMMleaAs9';

const ExerciseList = () => {
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercies] = useState([]);

  const muscleOptions = Object.entries(MUSCLE).map(
    ([muscle, description]) => (
      <option key={muscle} value={muscle}>
        {description}
      </option>
    )
  );

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMuscleChange = (event) => {
    setMuscle(event.target.value);
  };

  useEffect(() => {
    let urlAPI = 'https://api.api-ninjas.com/v1/exercises';

    const params = {};
    if (name) {
      params.name = name;
    }
    if (muscle) {
      params.muscle = muscle;
    }

    axios
      .get(urlAPI, {
        headers: { 'X-Api-Key': API },
        params: params,
      })
      .then((res) => {
        setExercies(res.data);
      });
  }, [name, muscle]);

  const exercisesListItem = exercises.map((exercise, index) => {
    return <ExerciseItem key={index} exercise={exercise} />;
  });

  return (
    <div className="p-3">
      <h1 className="text-warning fw-bold">Add New Exercise</h1>
      <div className="p-3">
        <form className="row row-cols-1 row-cols-md-2">
          <div className="col col-md-3 p-1">
            <select
                className="form-select col"
                value={muscle}
                onChange={handleMuscleChange}
              >
              <option value="">Select a muscle</option>
              {muscleOptions}
            </select>
          </div>
          <div className="col col-md-9 p-1">
            <input
              className="form-control"
              type="search"
              placeholder="type a workout name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </form>
      </div>

      <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
        {exercisesListItem}
      </div>
    </div>
  );
};

export default ExerciseList;
