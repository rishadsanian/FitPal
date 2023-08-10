import { useEffect, useState } from 'react';
import SetRecord from './SetRecord';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExerciseLog = (props) => {
  const [sets, setSets] = useState([]);
  const { session_id } = useParams();
  const [min, setMin] = useState(null);
  const max = 8;
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/sets/${session_id}/${props.name}`
        );
        if (!res.error) {
          setSets(res.data.sets);
          setMin(res.data.sets.length);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSets();
  }, [props.name]);

  const listOfSetRecord = sets.map((set) => {
    return <SetRecord set={set} key={set.id} />;
  });

  const addSet = () => {
    setSets((prev) => [
      ...prev,
      { id: sets.length, resistant: null, reps: null },
    ]);
  };

  const removeSet = () => {
    setSets((prev) => [...prev.slice(0, sets.length - 1)]);
  };

  return (
    <div className="pt-3" style={{ 'minHeight': '100vh' }}>
      <h1 className="text-warning pb-3">{props.name}</h1>
      {listOfSetRecord}
      <div className="d-flex justify-content-between gap-3 mt-3 p-3">
        <button
          className={
            sets.length === max
              ? 'btn btn-secondary flex-fill'
              : 'btn btn-light flex-fill'
          }
          onClick={addSet}
          disabled={sets.length === max}
        >
          <i className="fa-solid fa-plus fa-xs"></i>
        </button>
        <button
          className={
            sets.length === min
              ? 'btn btn-secondary flex-fill'
              : 'btn btn-light flex-fill'
          }
          onClick={removeSet}
          disabled={sets.length === min}
        >
          <i className="fa-solid fa-minus fa-xs"></i>
        </button>
      </div>

      <div className="d-grid gap-2 pb-3">
        <button className="btn btn-warning btn-large m-3 fill">
          Save
        </button>
      </div>
    </div>
  );
};

export default ExerciseLog;
