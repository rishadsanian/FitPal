/* eslint-disable react-hooks/exhaustive-deps */
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

  // Set variables from props that will never change
  const editable = props.editable;
  const programId = props.programId;
  const currentProfile = props.currentProfile;
  
  // Toggle the class on the card when the program is the current program for the user
  const cardClass = currentProfile && currentProfile.program_id === programId
      ? "card bg-dark text-start border-warning"
      : "card bg-dark text-start"

  // Get program functions from provider
  const { deleteProgram, updateProgram } = useContext(programContext);

  const navigate = useNavigate();

  useEffect(() => {
    setUpSessions();
  }, [sessions.length]);

  const setUpSessions = async () => {
    // Get the list of sessions based off of the program id
    await axios
      .get(`http://localhost:8080/sessions/program/${programId}`)
      .then((res) => {
        setSessions(res.data.sessions);
        setUpPotentialDays()
      });
  }

  // // Set up the list of potential days to choose from
  // Set up the list of potential days to choose from
  const setUpPotentialDays = () => {
    // Update possible session days
   let newPotentialDays = daysOfWeek.filter((day) => !sessions.map(session => session.day_of_week).includes(day.day_val));
   setPotentialDays(newPotentialDays)
   if(newPotentialDays.length){
     setNewSessionDay(newPotentialDays[0].day_val)
   }
 }

  const createNewSession = async (event) => {
    // prevent the default form action
    event.preventDefault();
    // check if the session name field is not blank
    if (newSessionName) {
      try {
        // Submit form data to the server
        const response = await axios.post(
          `/sessions/program/${programId}`,
          {
            name: newSessionName,
            day_of_week: newSessionDay,
            program_id: programId,
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
    if(editable){
      navigate(`/programs/${programId}/sessions/${session.id}`);
    } else {
      navigate(`/programs/${programId}/sessions/${session.id}/noedit`);
    }
  };

  // function to toggle edit mode
  const updateCurrentProgram = async (programId) => {
    try {
      // Submit form data to the server
      await axios.post(`/profile/`, {
        ...currentProfile,
        program_id: programId,
      });
      props.setCurrentProfile({
        ...currentProfile,
        program_id: programId,
      });
      // Update the profile state with the newly created/updated profile data
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  // Delete the current program and reload the page
  const deleteAndUpdateCurrentProgram = () => {
    if(currentProfile.program_id === programId){
      updateCurrentProgram(null, currentProfile);
    }
    deleteProgram(programId)
  }

  // // Set the program and clear edit mode
  // Set the program and clear edit mode
  const setProgramAndEditMode = () => {
    updateProgram(programId, programUpdate);
    setEditMode(false);
  }

  // List of functions and variables to export
  const providerData = {
    sessions,
    setSessions,
    setUpSessions,
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
    setUpPotentialDays,
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
  };

  // Provider details
  return (
    <sessionsContext.Provider value={providerData}>
      {props.children}
    </sessionsContext.Provider>
  );
};