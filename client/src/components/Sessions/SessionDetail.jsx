import axios from 'axios';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ExerciseList from '../Exercises/ExerciseList';

const SessionDetail = () => {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState([]);
  const [sets, setSets] = useState([]);
  const [editMode, setEditmode] = useState(false);

  // get the session id from the url
  const { session_id } = useParams();

  //edit session's name
  const onEditSessionName = () => {
    setEditmode(true);
  };

  const onSaveSessionName = (e) => {
    e.preventDefault();
    console.log(session_id)
    const data= {
      id: session_id,
      name: title
    }
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

  const onDeleteSession = () => {
    //delete session
  };

  const onChangeName = (e) => {
    setTitle(e.target.value);
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

  const exercisesListItem = exercises.map((exercise, index) => {
    const setList = sets
      .filter((set) => set.exercise_name === exercise.name)
      .map((set) => (
        <span className="badge text-bg-light" key={set.id}>
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
        <td role="button" className="p-3 d-flex justify-content-between">
          <div>
            <h6 className="">{exercise.name}</h6>
            <div className="d-flex gap-2 flex-wrap">{setList}</div>
          </div>
          {/* {add edit - delete button} */}
          <div className="align-self-center">
            <button className="btn">
              <i className="fa-regular fa-pen-to-square fa-xl text-light"></i>
            </button>
            <button className="btn">
              <i className="fa-regular fa-trash-can fa-xl text-danger"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="row row-col-1 row-col-md-2">
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
            <div className="d-flex justify-content-between mb-5">
              <h1 className="display-5 fw-bold text-warning">{title}</h1>
              <div className="align-self-center">
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

        <div className="col col-12 col-md-6 col-xl-8">
          <ExerciseList />
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
