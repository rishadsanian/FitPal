import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
  });

  // get logged in user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile/1"); // Replace '1' with user-id from cookies
        setProfile(response.data);
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
      // Submit form data to the server
      const response = await axios.post("/profile", {
        user_id: 1, // Replace '1' with user-id from cookies
        age: profile.age,
        height: profile.height,
        weight: profile.weight,
        gender: profile.gender,
      });

      // Update the profile state with the newly created/updated profile data
      setProfile(response.data);
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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-header">
              <h3 className="text-warning fw-bold">Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    value={profile.age}
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
                <button type="submit" className="btn btn-warning">
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-header">
                <h3 className="text-warning fw-bold">Profile</h3>
              </div>
              <div className="card-body">
                <div className="row row-cols-2 gy-3">
                  <div className="col">
                    <div className="profile-card p-3">
                      <div className="key">Age</div>
                      <div className="value">{profile.age}</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
