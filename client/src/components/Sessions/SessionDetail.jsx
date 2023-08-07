import ExerciseItem from '../Exercises/ExerciseItem';
import axios from 'axios';
import { useParams } from 'react-router';

import { useEffect, useState } from 'react';

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

    axios
      .get(`http://localhost:8080/sets/${session_id}`)
      .then((res) => {
        
        //Set up the list of exercises from sets
        let exerciseList = [];
        for(const set of res.data.sets) {
          if(!exerciseList.map(exercise => exercise.name).includes(set.exercise_name)) {
            exerciseList.push({name: set.exercise_name})
          }
        }
        setSets(res.data.sets);
        setExercises(exerciseList)
    });

    return;
  }, []);

  const exercisesListItem = exercises.map((exercise, index) => {
    return <ExerciseItem key={index} exercise={exercise} sets={sets} userExercises={exercises}/>;
  });
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 bg-dark opacity-75">
        <h1 className="display-5 fw-bold text-warning">{title}</h1>
        <a
          href={addPath}
          className="btn btn-outline-warning text-white p-3 rounded-circle"
        >
          <i class="fa-solid fa-plus fa-2xl"></i>
        </a>
      </div>

      <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
        {exercisesListItem}
      </div>
    </div>
  );
};

export default SessionDetail;
