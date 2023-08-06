import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "../styles/Profile.css";

//State
const Profile = () => {
  const [profile, setProfile] = useState({
    date_of_birth: null,
    height: 0,
    weight: 0,
    gender: "Not Selected",
  });
  const [editing, setEditing] = useState(false); // State to track whether the form is in editing mode or not

  // get logged in user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile/4");
        const formattedDate = moment(response.data.date_of_birth).format("YYYY-MM-DD"); // Format the date
        setProfile({ ...response.data, date_of_birth: formattedDate });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfile();
  }, []);

  // on submit
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
      });

      // Update the profile state with the newly created/updated profile data
      setProfile(response.data);
      setEditing(false); // Hide the form after submitting
    } catch (error) {
      console.error("Error creating/updating profile:", error);
    }
  };

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true); // Show the form in editing mode
  };

  const handleCancel = () => {
    setEditing(false); // Hide the form
  };

  //calculate current age
  const calculatedAge = profile.date_of_birth
    ? moment().diff(moment(profile.date_of_birth), "years")
    : null;


  return (
    <div className="p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-header">
            <h1 className="display-5 fw-light text-warning">Profile</h1>
            </div>
            <div className="card-body p-3">
              {editing ? (
                <form onSubmit={handleSubmit} className="form-content">
                  <div className="mb-3">
                    <label htmlFor="date_of_birth" className="form-label">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={profile.date_of_birth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="height" className="form-label">
                      Height:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      name="height"
                      value={profile.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="weight" className="form-label">
                      Weight:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      name="weight"
                      value={profile.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender:
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-buttons-container">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={handleSubmit}
                    >
                      Save Profile
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                // Toggle between form and display
              ) : (
                <div className="row row-cols-2 gy-3">
                  <div className="col">
                    <div className="profile-card p-3">
                      <div className="key">Age</div>
                      <div className="value"> {calculatedAge !== null ? `${calculatedAge}` : "Birth date not entered"}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="profile-card p-3">
                      <div className="key">Height</div>
                      <div className="value">{profile.height}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="profile-card p-3">
                      <div className="key">Weight</div>
                      <div className="value">{profile.weight}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="profile-card p-3">
                      <div className="key">Gender</div>
                      <div className="value">{profile.gender}</div>
                    </div>
                  </div>
                </div>
              )}
              {/* show edit button only on display view */}
              {!editing && (
                <div className="edit-button text-center">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
