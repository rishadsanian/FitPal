//State
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const ProfileContext = createContext();
export const useWorkoutContext = () => {
  return useContext(ProfileContext);
};

export function ProfileProvider({ children }) {
  //------------------------STATES------------------------------------------///
  const [profile, setProfile] = useState({
    date_of_birth: null,
    height: 0,
    weight: 0,
    gender: "Not Selected",
    fitness_level: "Not Selected",
    goal: "Not Set",
  });
  const [editing, setEditing] = useState(false);
  //------------------------------------------------------------------------//
  //---------------------FUNCTIONS---------------------------------------//

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile/4");
      const formattedDate = moment(response.data.date_of_birth).format(
        "YYYY-MM-DD"
      ); // Format the date
      setProfile({ ...response.data, date_of_birth: formattedDate });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  //--------------------------------------------------------------------//
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Submit form data to the server and db
      const response = await axios.post("/profile", {
        user_id: 4, // Replace '1' with user-id from current_user prop
        date_of_birth: profile.date_of_birth,
        height: profile.height,
        weight: profile.weight,
        gender: profile.gender,
        fitness_level: profile.fitness_level,
        goal: profile.goal,
      });

      // Update the profile state with the newly created/updated profile data
      setProfile(response.data);
      setEditing(false); // Hide the form after submitting
    } catch (error) {
      console.error("Error creating/updating profile:", error);
    }
  };
  //--------------------------------------------------------------------//

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  //--------------------------------------------------------------------//

  const handleEdit = () => {
    setEditing(true); // Show the form in editing mode
  };
  //--------------------------------------------------------------------//

  const handleCancel = () => {
    setEditing(false); // Hide the form
  };
  //--------------------------------------------------------------------//
  //calculate current age
  const calculatedAge = profile.date_of_birth
    ? moment().diff(moment(profile.date_of_birth), "years")
    : null;
  //--------------------------------------------------------------------//

  // get logged in user's profile
  useEffect(() => {
    fetchProfile();
  }, []);

  // on submit

  const contextValues = {
    profile,
    setProfile,
    editing,
    setEditing,

    fetchProfile,
    handleSubmit,
    handleCancel,
    handleChange,
    handleEdit,
    calculatedAge
  };

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  );
}
