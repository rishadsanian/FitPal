import ExerciseItem from '../Exercises/ExerciseItem';
import axios from 'axios';

import { useEffect, useState } from 'react';

const SessionDetail = () => {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState([]);

  const urlPath = window.location.pathname;
  const pathParts = urlPath.split('/');
  const sessionID = pathParts[pathParts.length - 1];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/exercises/session/${sessionID}`)
      .then((res) => {
        setExercises(res.data.exercises);
        setTitle(res.data.exercises[0].session);
      });
  }, []);

  const exercisesListItem = exercises.map((exercise, index) => {
    return <ExerciseItem key={index} exercise={exercise} />;
  });
  return (
    <div>
      <h1 className="display-5 pt-3 fw-bold text-warning">{title}</h1>
      <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
        {exercisesListItem}
      </div>
      
    </div>
  );
};

export default SessionDetail;
