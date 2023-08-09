//State
import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();
export const useWorkoutContext = () => {
  return useContext(ProfileContext);
};

  const [profile, setProfile] = useState({
    date_of_birth: null,
    height: 0,
    weight: 0,
    gender: "Not Selected",
    fitness_level: "Not Selected",
    goal: "Not Set",
  });
  const [editing, setEditing] = useState(false); // State to track whether the form is in editing mode or not