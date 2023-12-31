import React from 'react';
import '../../index.css'
const RecordHistory = (props) => {
  const logs = props.logs;
  const daysArray = [
    ...new Set(
      logs.map(
        (log) => new Date(log.timestamp).toISOString().split('T')[0]
      )
    ),
  ];
  const logsByDay = (day) => {
    return logs.filter(
      (log) => new Date(log.timestamp).toISOString().split('T')[0] === day
    );
  };

  return (
    <div className="accordion p-3">
      {daysArray.map((day, index) => (
        <div className="accordion-item bg-dark p-0" key={index}>
          <h2 className="accordion-header">
            <button
              className="btn btn-dark w-100"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="true"
              aria-controls={`collapse${index}`}
            >
              <p className='text-warning fw-bold m-0'>{day}</p> 
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body text-white p-0">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Weight</th>
                    <th scope="col">Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {logsByDay(day).map((log) => (
                    <tr key={log.id}>
                      <td>{log.resistance}</td>
                      <td>{log.reps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordHistory;
