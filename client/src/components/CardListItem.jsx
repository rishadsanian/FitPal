import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProgramListItem(props) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sessions/program/${props.programId}`)
      .then((res) => {
        setSessions(res.data.sessions);
      });
  }, []);

  const sessionsListItem = sessions.map((session) => {
    return (
      <tr>
        <td>{session.name}</td>
      </tr>
    );
  });

  return (
    <div className="col my-3">
      <div className="card bg-dark text-start">
        {/* Program info */}
        <div className="card-body ">
          <h3 className="text-warning">{props.name}</h3>
          <p className="text-white">{props.description}</p>
        </div>
        {/* Add session form */}
        <div className="card-body border-top border-color-white">
          <form>
            <div class="input-group flex-nowrap">
              <input
                type="text"
                className="form-control bg-secondary opacity-75 text-white"
                placeholder="Add session"
              />
              <button
                className="input-group-text btn btn-warning"
                id="addon-wrapping"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
        </div>
        {/* Session list */}
        <div className="card-body d-flex justify-content-between text-white">
          <table className="table table-dark table-striped">
            <tbody>{sessionsListItem}</tbody>
          </table>
        </div>

        {/* Edit - Delete */}
        <div className="d-flex justify-content-end gap-3 p-2 border-top border-color-white">
          <button className="btn btn-dark">
            <i class="fa-regular fa-pen-to-square fa-xl text-light"></i>
          </button>
          <button className="btn btn-dark">
            <i class="fa-regular fa-trash-can fa-xl text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgramListItem;
