/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SetRecord from './SetRecord';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecordHistory from './RecordHistory';

const ExerciseLog = (props) => {
  const [sets, setSets] = useState([]);
  const { session_id } = useParams();
  const [records, setRecords] = useState([]);
  const [logs, setLogs] = useState([]);
  const user_id = window.sessionStorage.getItem('userId');
  const [isSave, setIsSave] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Get min anx max set for exercise
  const max = 8;
  const [min, setMin] = useState(null);

  // Get Logs of this exercise of this user
  const fecthLogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/log/${user_id}/${props.name}`
      );
      if (!res.error) {
        setLogs(res.data.logs);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Get Sets of this exercise of this Session
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

  // Get Sets and Logs by exercise's name
  useEffect(() => {
    fetchSets();
    fecthLogs();
    setIsSave(false);
    console.log(records);
  }, [props.name, isSave]);

  //
  const updateRecords = (updatedRecord) => {
    setRecords((prevRecords) => {
      // Check if Records contain this record
      const hasRecord = prevRecords.some(
        (record) => record.id === updatedRecord.id
      );

      if (hasRecord) {
        // Updated record in Records
        const updatedRecords = prevRecords.map((record) => {
          if (record.id === updatedRecord.id) {
            return { ...record, ...updatedRecord };
          }
          return record;
        });
        return updatedRecords;
      } else {
        // Add record to Records
        return [...prevRecords, updatedRecord];
      }
    });
  };

  // Render SetRecord list
  const listOfSetRecord = sets.map((set) => {
    return (
      <SetRecord
        set={set}
        key={set.id}
        updateRecord={(re) => {
          updateRecords(re);
        }}
        reset={isReset}
        setReset={()=>{setIsReset(false)}}
      />
    );
  });

  // Add new set when [+] clicked
  const addSet = () => {
    setSets((prev) => [
      ...prev,
      { id: sets.length, resistant: null, reps: null },
    ]);
  };

  // Remove set when [-] clicked
  const removeSet = () => {
    setSets((prev) => [...prev.slice(0, sets.length - 1)]);
  };

  // Save button clicked
  const onSave = async () => {
    try {
      const promises = [];
      for (const re of records) {
        if (re.reps > 0) {
          const data = {
            reps: re.reps,
            resistance: re.resistance || 0,
            exercise_name: props.name,
            user_id: window.sessionStorage.getItem('userId'),
          };
          promises.push(axios.post(`http://localhost:8080/log/`, data));
        }
      }

      await Promise.all(promises);

      setIsSave(true);
      setRecords([]);
      setIsReset(true);
      props.onSaveComplete();
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  return (
    <div className="pt-3 px-3" style={{ minHeight: '100vh' }}>
      {/* Exercise name for Title */}
      <h1 className="display-5 pt-3 fw-bold text-white mb-5">
        {props.name}
      </h1>

      {/* SetRecords list */}
      {listOfSetRecord}

      {/* [+] [-] button */}
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

      {/* Save button */}
      <div className="d-grid">
        <button
          className="btn btn-warning btn-large m-3 fill"
          onClick={onSave}
        >
          Save
        </button>
      </div>

      {/* Display Record history (Logs) here */}
      <RecordHistory logs={logs} />
    </div>
  );
};

export default ExerciseLog;
