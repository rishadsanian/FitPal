import React from "react";
import moment from "moment";
import SliderComponent from "../Dashboard/Slider";
import Profile from "../Dashboard/Profile";
import Log from "./Log";
import ChartWorkout from "../Dashboard/ChartWorkout";
import TitleImage from "../TitleCards/TitleImage";
import "../../styles/Main.css";
import { ProfileProvider } from "../../contexts/ProfileContext";
import { WorkoutProvider } from "../../contexts/WorkoutContext";
import ChatGptDailySummary from "../Dashboard/ChatGptDailySummary";
//Dashboard/logged in main page

const Main = () => {
  // Formatted date for display
  const currentDate = moment().format("dddd, MMMM D");

  return (
    // delete main-container
    <div className="">
      <TitleImage icon={"fa-solid fa-table-columns"} />

      {/* delete header-container */}
      <div className="row row-cols-1 row-cols-md-2">
        {/* Header */}
        <div className="p-3 text-start bg-dark col col-md-12 col-lg-4">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold text-warning">Welcome User</h1>
            <p className="col-md-8 text-white">{currentDate}</p>
            <p className="col-md-8 fs-4 text-white">
            <h1 className="display-5 fw-light text-warning">Daily Summary</h1> 
            </p>
            <ProfileProvider>
              <ChatGptDailySummary />
            </ProfileProvider>
          </div>
        </div>

        {/* Profile Section */}
        {/* delete profile-container */}
        <div className="col col-md-12 col-lg-8">
          <ProfileProvider>
            <Profile />
          </ProfileProvider>
        </div>
      </div>

      {/* Add Workout Section */}
      <div className="container">
        <Log />
      </div>

      {/* Program Schedule Section USE SLIDER OR CAROUSEL*/}
      {/* delete slider-container */}
      <div className="bg-dark opacity-75 p-5">
        <h1 className="display-5 fw-light text-warning">Program Schedule</h1>
        <ProfileProvider>
          <WorkoutProvider>
            <SliderComponent />
          </WorkoutProvider>
        </ProfileProvider>
      </div>

      {/* Analytics Section */}
      <div className="container mt-5">
        {/* <h3 className="display-5 fw-bold text-warning">Analytics</h3> */}

        <div className="analytics-container container mt-5">
          {/* Exercise Tracker */}
          <ChartWorkout />
        </div>
      </div>
    </div>
  );
};

export default Main;
