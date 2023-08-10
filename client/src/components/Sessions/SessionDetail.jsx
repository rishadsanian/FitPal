import axios from 'axios';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ExerciseList from '../Exercises/ExerciseList';
import SessionItem from './SessionItem';
import AddExerciseModal from '../Exercises/AddExerciseModal';
import ExerciseLog from '../Exercises/ExerciseLog';
const SessionDetail = () => {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState([]);
  const [sets, setSets] = useState([]);
  const [editMode, setEditmode] = useState(false);
  const [editSet, setEditSet] = useState(false);
  const [selectedEx, setSelectedEx] = useState('');

  const [displayLog, setDisplayLog] = useState(false);
  const [displayExerciseList, setDisplayExerciseList] = useState(
    !displayLog
  );

  // get the session id from the url
  const { session_id } = useParams();

  //edit session's name
  const onEditSessionName = () => {
    setEditmode(true);
  };

  const onSaveSessionName = (e) => {
    e.preventDefault();
    const data = {
      id: session_id,
      name: title,
    };
    axios
      .post(`http://localhost:8080/sessions/${session_id}`, data)
      .then((res) => {
        if (res.status === 200) {
          setEditmode(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDeleteSession = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/sessions/${session_id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/programs';
        }
      })
      .catch((e) => console.log(e));
  };

  const onChangeName = (e) => {
    setTitle(e.target.value);
  };

  const onEdit = (exercise) => {
    setEditSet(true);
    setSelectedEx(exercise);
  };

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

  const onRowSelected = (exercise) => {
    setDisplayLog(true);
    setDisplayExerciseList(false);
    setSelectedEx(exercise);
  };

  const onAddExerciseClick = () => {
    setDisplayExerciseList(true);
    setDisplayLog(false);
  };

  

  const exercisesListItem = exercises.map((exercise, index) => {
    return (
      <SessionItem
        key={index}
        sets={sets}
        exercise={exercise}
        onClick={() => {
          onEdit(exercise);
        }}
        onRowSelected={() => {
          onRowSelected(exercise);
        }}
      />
    );
  });

  return (
    <div>
      <div className="row row-col-1 row-col-md-2">
        {/* List of exercises in current session */}
        <div className="col col-12 col-md-6 col-xl-4 bg-dark opacity-75 text-start py-3 px-5">
          {editMode ? (
            <form className="mb-5">
              <div className="input-group">
                <input
                  className="form-control bg-secondary text-white fs-3"
                  type="text"
                  value={title}
                  onChange={onChangeName}
                />
                <button
                  className="input-group-text btn btn-warning"
                  id="addon-wrapping"
                  onClick={onSaveSessionName}
                >
                  <i className="fa-solid fa-check fa-xl text-white"></i>
                </button>
              </div>
            </form>
          ) : (
            <div >
                <h1 className="display-5 pt-3 fw-bold text-white">{title}</h1>
              <div className="d-flex justify-content-between mb-5">
                <a
                  className="btn btn-warning text-white"
                  href="#addExercise"
                  onClick={onAddExerciseClick}
                >
                  <i className="fa-solid fa-plus"></i> exercise
                </a>
                <div className="d-flex">
                  <button
                    className="btn btn-dark"
                    onClick={onEditSessionName}
                  >
                    <i className="fa-regular fa-pen-to-square fa-xl text-light"></i>
                  </button>
                  <button className="btn btn-dark" onClick={onDeleteSession}>
                    <i className="fa-regular fa-trash-can fa-xl text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

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

        {/* Add New Exercise Part */}
        {displayExerciseList && (
          <div className="col col-12 col-md-6 col-xl-8" id="addExercise">
            <ExerciseList />
          </div>
        )}

        {displayLog && (
          <div className="col col-12 col-md-6 col-xl-8 px-0">
            <ExerciseLog name={selectedEx.name}/>
          </div>
        )}
      </div>

      {editSet && (
        <AddExerciseModal
          setModalDisplay={setEditSet}
          name={selectedEx.name}
        />
      )}
    </div>
  );
};

export default SessionDetail;
