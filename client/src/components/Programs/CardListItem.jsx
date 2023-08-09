import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import DeletePopupModal from "../DeletePopupModal";
import { programContext } from "../../contexts/ProgramProvider";

function ProgramListItem(props) {
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState("");
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  // State for when editing a program
  const [programUpdate, setProgramUpdate] = useState({
    name: props.name,
    description: props.description,
  });
  const [editMode, setEditMode] = useState(false);
  // Toggle the class on the card when the program is the current program for the user
  const cardClass =
    props.currentProfile && props.currentProfile.program_id === props.programId
      ? "card bg-dark text-start border-warning"
      : "card bg-dark text-start";

  const navigate = useNavigate();

  // Get program functions from
  const { deleteProgram, updateProgram } = useContext(programContext);

  useEffect(() => {
    // Get the list of sessions based off of the program id
    axios
      .get(`http://localhost:8080/sessions/program/${props.programId}`)
      .then((res) => {
        setSessions(res.data.sessions);
      });
  }, []);

  const createNewSession = async (event, program_id) => {
    // prevent the default form action
    event.preventDefault();
    // check if the session name field is not blank
    if (newSessionName) {
      try {
        // Submit form data to the server
        const response = await axios.post(`/sessions/program/${program_id}`, {
          name: newSessionName,
          program_id,
        });
        setSessions([...sessions, response.data]);
        setNewSessionName("");
        // reload the page after the session is created
        // Update the profile state with the newly created/updated profile data
      } catch (error) {
        console.error("Error creating session:", error);
      }
    }
  };

  // navigation for the session
  const navigateToSession = (session) => {
    navigate(`/programs/${props.programId}/sessions/${session.id}`);
  };

  // function to toggle edit mode
  const updateCurrentProgram = async (programId) => {
    try {
      // Submit form data to the server
      const response = await axios.post(`/profile/`, {
        ...props.currentProfile,
        program_id: programId,
      });
      props.setCurrentProfile({
        ...props.currentProfile,
        program_id: programId,
      });
      // Update the profile state with the newly created/updated profile data
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  // function to toggle edit mode
  const toggleEditMode = async (programId) => {
    if (editMode) {
      updateProgram(programId, programUpdate);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const sessionsListItem = sessions.map((session, index) => {
    return (
      <tr key={index}>
        <td role="button" onClick={() => navigateToSession(session)}>
          {session.name}
        </td>
      </tr>
    );
  });
  return (
    <div className="col my-3">
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
        {props.editable && (
          <div className="card-body border-top border-color-white">
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
                  onClick={(e) => createNewSession(e, props.programId)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Session list */}
        <div className="card-body d-flex justify-content-between text-white">
          <table className="table table-dark table-striped">
            <tbody>{sessionsListItem}</tbody>
          </table>
        </div>
        {props.userView && (
          <div className="d-flex justify-content-end gap-3 p-2 border-top border-color-white">
            {/* Toggle star Icon when the current program is the users selected program*/}
            {props.currentProfile &&
            props.currentProfile.program_id !== props.programId ? (
              <button
                className="btn btn-dark"
                onClick={() => updateCurrentProgram(props.programId)}
              >
                <i className="fa-regular fa-star fa-xl text-warning"></i>
              </button>
            ) : (
              <button className="btn btn-dark" disabled>
                <i className="fa-solid fa-star fa-xl text-warning"></i>
              </button>
            )}
            {/* Edit - Delete */}
            {editMode && (
              <button
                className="btn btn-dark"
                onClick={() => setEditMode(false)}
              >
                <i className="fa-regular fa-x text-danger fa-xl"></i>
              </button>
            )}
            {props.editable && (
              <button
                className="btn btn-dark"
                onClick={() => toggleEditMode(props.programId)}
              >
                {editMode ? (
                  <i class="fa-solid fa-check fa-xl text-warning"></i>
                ) : (
                  <i className="fa-regular fa-pen-to-square fa-xl text-light"></i>
                )}
              </button>
            )}
            {props.editable && (
              <button
                className="btn btn-dark"
                onClick={() => setDisplayDeleteModal(true)}
              >
                <i className="fa-regular fa-trash-can fa-xl text-danger"></i>
              </button>
            )}
          </div>
        )}
      </div>
      {/* Delete Modal */}
      {displayDeleteModal && (
        <DeletePopupModal
          modalToggle={setDisplayDeleteModal}
          modalAction={deleteProgram}
          modalParams={props.programId}
          message={`Deleting program ${props.name}`}
        />
      )}
    </div>
  );
}

export default ProgramListItem;
