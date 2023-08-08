import ExerciseItem from '../Exercises/ExerciseItem';
import axios from 'axios';
import { useParams } from 'react-router';

import { useEffect, useState } from 'react';
import ExerciseList from '../Exercises/ExerciseList';

const SessionDetail = () => {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState([]);
  const [sets, setSets] = useState([]);

  // get the session id from the url
  const { session_id } = useParams();

  const addPath = `${session_id}/exercises`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sessions/${session_id}`)
      .then((res) => {
        setTitle(res.data.sessions[0].name);
      });

    axios.get(`http://localhost:8080/sets/${session_id}`).then((res) => {
      //Set up the list of exercises from sets
      let exerciseList = [];
      for (const set of res.data.sets) {
        if (
          !exerciseList
            .map((exercise) => exercise.name)
            .includes(set.exercise_name)
        ) {
          exerciseList.push({ name: set.exercise_name });
        }
      }
      setSets(res.data.sets);
      setExercises(exerciseList);
    });

    return;
  }, []);

  const exercisesListItem = exercises.map((exercise, index) => {
    const setList = sets
      .filter((set) => set.exercise_name === exercise.name)
      .map((set) => (
        <span className="badge text-bg-light">
          {set.resistant}lbs/{set.reps}
        </span>
      ));
    return (
      // <ExerciseItem
      //   key={index}
      //   exercise={exercise}
      //   sets={sets}
      //   userExercises={exercises}
      // />
      <tr key={index}>
        <td role="button" className='p-3'>
          <h6 className=''>{exercise.name}</h6>
          <div className='d-flex gap-2 flex-wrap'>{setList}</div>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="row">
        <div className="col col-12 col-md-5 col-xl-4 bg-dark opacity-75 text-start py-3 px-5">
          <h1 className="display-5 fw-bold text-warning">{title}</h1>

          <div className="row row-cols-1 ">
            {exercises.length > 0 ? (
              <table className="table table-dark table-striped">
                <tbody>{exercisesListItem}</tbody>
              </table>
            ) : (
              <p className="display-6 fw-light text-white">
                no exercises added yet
              </p>
            )}
          </div>
        </div>

        <div className="col col-12 col-md-7 ccol-xl-8">
          <ExerciseList />
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
