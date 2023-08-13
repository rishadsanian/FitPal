/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../../styles/Profile.css';
import { useProfileContext } from '../../contexts/ProfileContext';

//State
const Profile = () => {
  const {
    profile,
    editing,
    fetchProfile,
    handleSubmit,
    handleCancel,
    handleChange,
    handleEdit,
    calculatedAge,
  } = useProfileContext();
  // get logged in user's profile
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="py-5 px-3">
      <div className="card bg-dark text-white border border-3 border-secondary">
        <div className="card-header border-bottom border-secondary text-center">
          <h3 className="fw-bold text-warning">Profile</h3>
        </div>
        <div className="card-body p-3">
          {editing ? (
            <form onSubmit={handleSubmit} className="form-content">
              <div className="mb-3">
                <label
                  htmlFor="date_of_birth"
                  className="form-label text-secondary text-start"
                >
                  Date of Birth
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
                <label
                  htmlFor="height"
                  className="form-label text-secondary text-start"
                >
                  Height (cm)
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
                <label
                  htmlFor="weight"
                  className="form-label text-secondary text-start"
                >
                  Weight (lbs)
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
                <label
                  htmlFor="gender"
                  className="form-label text-secondary text-start"
                >
                  Gender:
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="fitness_level"
                  className="form-label text-secondary text-start"
                >
                  Fitness Level
                </label>
                <select
                  className="form-select"
                  id="fitness_level"
                  name="fitness_level"
                  value={profile.fitness_level}
                  onChange={handleChange}
                >
                  <option value="">Select Fitness Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="goal"
                  className="form-label text-secondary text-start"
                >
                  Goal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="goal"
                  name="goal"
                  value={profile.goal}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="btn btn-warning me-md-2 mb-2 fw-bold opacity-75 "
                  onClick={handleSubmit}
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  className="btn btn-secondary me-md-2 mb-2 fw-bold opacity-75"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Toggle between form and display
            <div className="row row-cols-2 gy-3">
              <div className="col">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Age</div>
                  <div className="value">
                    {calculatedAge !== null
                      ? `${calculatedAge}`
                      : 'Not Set'}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Height (cm)</div>
                  {profile.height ? (
                    <div className="value">{profile.height}</div>
                  ) : (
                    <div className="value">Not Set</div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Weight (lbs)</div>
                  {profile.weight ? (
                    <div className="value">{profile.weight}</div>
                  ) : (
                    <div className="value">Not Set</div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Gender</div>
                  {profile.gender ? (
                    <div className="value">{profile.gender}</div>
                  ) : (
                    <div className="value">Not Set</div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Fitness Level</div>
                  {profile.fitness_level ? (
                    <div className="value">{profile.fitness_level}</div>
                  ) : (
                    <div className="value">Not Set</div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Goal</div>
                  {profile.goal ? (
                    <div className="value">{profile.goal}</div>
                  ) : (
                    <div className="value">Not Set</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="profile-card p-3 border border-secondary rounded border-3">
                  <div className="key text-warning">Program</div>
                  {profile.program_id ? (
                    <div className="value">{profile.name}</div>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center p-3">
                      <a
                        href="/programs"
                        className="text-decoration-none text-warning"
                      >
                        <i className="circle-add-icon fas fa-plus-circle fa-3x"></i>
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* show edit button only on display view */}
          {!editing && (
            <div className="edit-button text-center w-100">
              <button
                type="button"
                className="btn btn-warning font-weight-bold text-dark fw-bold"

                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
