import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import DeletePopupModal from './DeletePopupModal';

function ProgramListItem(props) {
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState("");
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sessions/program/${props.programId}`)
      .then((res) => {
        setSessions(res.data.sessions);
      });
  }, []);

  

  const createNewSession = async (event, program_id) => {
      try {
        
        // Submit form data to the server
        const response = await axios.post(`/sessions/program/${program_id}`, {
          name: newSessionName,
          program_id
        });

        // Update the profile state with the newly created/updated profile data
      } catch (error) {
        console.error("Error creating session:", error);
      }
  };

  const deleteProgram = async (programId) => {
    try {
      // Submit form data to the server
      await axios.post(`/programs/${programId}/delete`);
      //reload the page
      navigate(0);
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  }
  
  // navigation for the session
  const navigateToSession = (session) => {
    navigate(`/programs/${props.programId}/sessions/${session.id}`);
  }

  const sessionsListItem = sessions.map((session) => {
    return (
      <tr>
          <td role="button" onClick={() => navigateToSession(session)}>
            {session.name}
          </td>
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
                onChange={(e) => setNewSessionName(e.target.value)}
              />
              <button
                className="input-group-text btn btn-warning"
                id="addon-wrapping"
                onClick={(e) => createNewSession(e, props.programId)}
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
          <button className="btn btn-dark" onClick={() => setDisplayDeleteModal(true)}>
            <i class="fa-regular fa-trash-can fa-xl text-danger"></i>
          </button>
        </div>
      </div>
      {displayDeleteModal && 
      <DeletePopupModal 
        modalToggle={setDisplayDeleteModal} 
        modalAction={deleteProgram}
        modalParams={props.programId}
        message={`Deleting program ${props.name}`}
      />}
    </div>
  );
}

export default ProgramListItem;
