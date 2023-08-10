import { useEffect, useState } from 'react';
import SetRecord from './SetRecord';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExerciseLog = (props) => {
  const [sets, setSets] = useState([]);
  const { session_id } = useParams();
  const [min, setMin] = useState(null);
  const [records, setRecords] = useState([]);
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

  const updateRecords = (updatedRecord) => {
    setRecords((prevRecords) => {
      const hasRecord = prevRecords.some(
        (record) => record.id === updatedRecord.id
      );

      if (hasRecord) {
        const updatedRecords = prevRecords.map((record) => {
          if (record.id === updatedRecord.id) {
            return { ...record, ...updatedRecord };
          }
          return record;
        });
        return updatedRecords;
      } else {
        return [...prevRecords, updatedRecord];
      }
    });
    console.log(records);
  };

  const listOfSetRecord = sets.map((set) => {
    return (
      <SetRecord
        set={set}
        key={set.id}
        updateRecord={(re) => {
          updateRecords(re);
        }}
      />
    );
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

  const onSave = () => {
    // for (const re of records) {
    //   if (re.reps > 0) {
    //     const data = {
    //       reps: re.reps,
    //       resistance: re.resistance || 0,
    //       exercise_name: props.name,
    //       user_id: window.sessionStorage.getItem('userId'),
    //     };
    //     axios
    //       .post(`http://localhost:8080/log/`, data)
    //       .then((result) => {
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   }
    // }
  };

  return (
    <div className="pt-3" style={{ minHeight: '100vh' }}>
      <h1 className="display-5 pt-3 fw-bold text-white mb-5">
        {props.name}
      </h1>
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

      <div className="d-grid">
        <button
          className="btn btn-warning btn-large text-white m-3 fill"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ExerciseLog;
