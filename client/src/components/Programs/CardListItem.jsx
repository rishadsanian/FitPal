import React from "react";
import { useContext } from "react";

import { userContext } from "../../contexts/UserContext";
import { sessionsContext } from "../../contexts/SessionsProvider";

function ProgramListItem() {
  // Get user functions from user provider
  const { authenticated } = useContext(userContext);

  const { 
    sessions,
    programId,
    newSessionName,
    setNewSessionName,
    newSessionDay,
    setNewSessionDay,
    createNewSession,
    editMode,
    setEditMode,
    deleteMode,
    setDeleteMode,
    potentialDays,
    programUpdate,
    setProgramUpdate,
    updateCurrentProgram,
    setProgramAndEditMode,
    deleteAndUpdateCurrentProgram,
    navigateToSession,
    daysOfWeek,
    editable,
    cardClass,
    currentProfile
  } = useContext(sessionsContext);

  const sessionsListItem = sessions.map((session, index) => {
    return (
      <tr key={index}>
        <td className="d-flex justify-content-between" role="button" onClick={() => navigateToSession(session)}>
          <span>{daysOfWeek[session.day_of_week].day.slice(0, 3)}</span> 
          <span>{session.name}</span>
        </td>
      </tr>
    );
  });
  return (
    <div className="col my-3" style={{minWidth: '23em'}}>
      <div className={cardClass}>
        {/* Program info */}
        {editMode ? (
          <div className="card-body ">
            {/* If we are in edit mode */}
            <input
              type="text"
              value={programUpdate.name}
              className="form-control bg-secondary opacity-75 text-white mb-2"
              onChange={(e) =>
                setProgramUpdate({
                  ...programUpdate,
                  name: e.target.value,
                })
              }
            />
            <textarea
              type="text"
              value={programUpdate.description}
              className="form-control bg-secondary opacity-75 text-white"
              onChange={(e) =>
                setProgramUpdate({
                  ...programUpdate,
                  description: e.target.value,
                })
              }
            />
          </div>
        ) : (
          <div className="card-body ">
            {/* If not in edit mode */}
            <h3 className="text-warning">{programUpdate.name}</h3>
            <p className="text-white">{programUpdate.description}</p>
          </div>
        )}
        {/* Add session form */}
        {editable && potentialDays.length && <div className="card-body border-top border-color-white">
          <form>
            
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control bg-secondary opacity-75 text-white"
                placeholder="Add session"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
              />
              <button
                className="input-group-text btn btn-warning"
                id="addon-wrapping"
                onClick={(e) => createNewSession(e)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="mb-3 pt-2">
              <select
                className="form-select"
                id="day"
                name="day"
                value={newSessionDay}
                onChange={(e) => {setNewSessionDay(e.target.value)}}
              >
                {potentialDays.map((day, index) => (
                  <option key={index} value={day.day_val}>
                    {day.day}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>}
        {/* Session list */}
        {sessions.length > 0 && <div>
          <h6 className="text-warning px-4">Tap below to view more!</h6>
          <div className="card-body d-flex justify-content-between text-white">

            <table className="table table-dark table-striped">
              <tbody>{sessionsListItem}</tbody>
            </table>
          </div>
        </div>}
        {authenticated && (
          <div className="d-flex justify-content-end gap-3 p-2 border-top border-color-white">
            {/* Toggle star Icon when the current program is the users selected program*/}
            {currentProfile &&
            currentProfile.program_id !== programId ? (
              <button
                className="btn btn-dark"
                onClick={() => updateCurrentProgram()}
              >
                <i className="fa-regular fa-star fa-xl text-warning"></i>
              </button>
            ) : (
              <button  
                className="btn btn-dark"
                onClick={() => updateCurrentProgram(null)}
              >
                <i className="fa-solid fa-star fa-xl text-warning"></i>
              </button>
            )}
            {/* Edit - Delete */}
            {editable && <div>
              {editMode ? 
                <div className="border border-white rounded">
                  <button
                    className="btn btn-dark"
                    onClick={() => setProgramAndEditMode()}
                  >
                    <i className="fa-solid fa-check fa-xl text-light"></i>
                  </button> 
                   <button
                    className="btn btn-dark"
                    onClick={() => setEditMode(false)}
                  >
                    <i className="fa-regular fa-x fa-xl text-danger"></i>
                  </button> 
                </div>
                :
                
                <button
                  className="btn btn-dark"
                  onClick={() => setEditMode(true)}
                >
                  <i className="fa-regular fa-edit fa-xl text-light"></i>
                </button> 
              }
              </div>}
              {editable && <div>
              {(deleteMode) ? 
                <div className="border border-danger rounded">
                  <button
                    className="btn btn-dark"
                    onClick={() => deleteAndUpdateCurrentProgram()}
                  >
                    <i className="fa-solid fa-check fa-xl text-danger"></i>
                  </button> 
                   <button
                    className="btn btn-dark"
                    onClick={() => setDeleteMode(false)}
                  >
                    <i className="fa-regular fa-x fa-xl text-white"></i>
                  </button> 
                </div>
                :
                <button
                  className="btn btn-dark"
                  onClick={() => setDeleteMode(true)}
                >
                  <i className="fa-regular fa-trash-can fa-xl text-danger"></i>
                </button> 
              }
              </div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgramListItem;
