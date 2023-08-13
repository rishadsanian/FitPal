import {createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { programContext } from './ProgramProvider';
// Create a Context
export const sessionsContext = createContext();

const daysOfWeek = [
  {day_val: 0, day: "Monday"},
  {day_val: 1, day: "Tuesday"},
  {day_val: 2, day: "Wednesday"},
  {day_val: 3, day: "Thursday"},
  {day_val: 4, day: "Friday"},
  {day_val: 5, day: "Saturday"},
  {day_val: 6, day: "Sunday"},
]

// Create a Component wrapper from Context.Provider
export default function SessionsProvider(props) {
  // Here is our Shared State Object
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionDay, setNewSessionDay] = useState(0);
  const [potentialDays, setPotentialDays] = useState([]);

  // Modes for edit and delete
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // State for when editing a program
  const [programUpdate, setProgramUpdate] = useState({
    name: props.name,
    description: props.description,
  });

  // Get program functions from provider
  const { deleteProgram, updateProgram } = useContext(programContext);

  const navigate = useNavigate();

  const setUpSessions = async () => {
    // Get the list of sessions based off of the program id
    await axios
      .get(`http://localhost:8080/sessions/program/${props.programId}`)
      .then((res) => {
        setSessions(res.data.sessions);
        setUpPotentialDays()
      });
  }

  // Set up the list of potential days to choose from
  const setUpPotentialDays = () => {
     // Update possible session days
    let newPotentialDays = daysOfWeek.filter((day) => !sessions.map(session => session.day_of_week).includes(day.day_val));
    setPotentialDays(newPotentialDays)
    if(newPotentialDays.length){
      setNewSessionDay(newPotentialDays[0].day_val)
    }
  }

  useEffect(() => {
    setUpSessions();
  }, [sessions.length]);

  const createNewSession = async (event, program_id) => {
    // prevent the default form action
    event.preventDefault();
    // check if the session name field is not blank
    if (newSessionName) {
      try {
        // Submit form data to the server
        const response = await axios.post(
          `/sessions/program/${program_id}`,
          {
            name: newSessionName,
            day_of_week: newSessionDay,
            program_id,
          }
          
        );
        setSessions([...sessions, response.data].sort((a,b) => a.day_of_week < b.day_of_week))
        setNewSessionName("");
      } catch (error) {
        console.error("Error creating session:", error);
      }
    }
  };

  // navigation for the session
  const navigateToSession = (session) => {
    if(props.editable){
      navigate(`/programs/${props.programId}/sessions/${session.id}`);
    } else {
      navigate(`/programs/${props.programId}/sessions/${session.id}/noedit`);
    }
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

  // Delete the current program and reload the page
  const deleteAndUpdateCurrentProgram = (programId) => {
    if(props.currentProfile.program_id === programId){
      updateCurrentProgram(null);
    }
    deleteProgram(programId)
  }

  // Set the program and clear edit mode
  const setProgramAndEditMode = () => {
    updateProgram(props.programId, programUpdate);
    setEditMode(false);
  }

  // This list can get long with a lot of functions.  Reducer may be a better choice
  const providerData = {
    sessions,
    setSessions,
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
  };

  // We can now use this as a component to wrap anything
  // that needs our state
  return (
    <sessionsContext.Provider value={providerData}>
      {props.children}
    </sessionsContext.Provider>
  );
};