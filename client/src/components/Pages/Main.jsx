import React from "react";
import { Box, Slide } from "@mui/material";
import moment from "moment";
import SliderComponent from "../Slider";
import Profile from "../Profile";
import HistoryList from "../HistoryList";
import Log from "../Log";
import ChartWorkout from "../ChartWorkout";
import TitleImage from "../TitleCards/TitleImage";
import "../../styles/Main.css";

const Main = () => {
  // Formatted date for display
  const currentDate = moment().format("dddd, MMMM D");

  return (
    <div className="main-container"> 
      <TitleImage icon={"fa-solid fa-table-columns"} />

      {/* Header */}
      <div className="header-container"> 
        <div className="header-content">
          <h1 className="display-5 fw-bold text-warning">Welcome User</h1>
          <p className="col-md-8 fs-4 text-white">{currentDate}</p>
          <p className="col-md-8 fs-4 text-white">CHAT GPT generated motivation</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-container"> 
        <Profile />
      </div>

      {/* Add Workout Section */}
      <div className="add-workout-container"> 
        {/* Add log component */}
      </div>

      {/* Program Schedule Section */}
      <div className="slider-container"> 
        <SliderComponent />
      </div>

      {/* Recent Activity History Section */}
      <div className="history-container"> 
        <HistoryList />
      </div>

      {/* Analytics Section */}
      <div className="analytics-container"> 
        {/* Exercise Tracker */}
        <ChartWorkout />
      </div>
    </div>
  );
};

export default Main;
