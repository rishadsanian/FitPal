import React from "react";
import { Box, Slide } from "@mui/material";
import moment from "moment";
import SliderComponent from "./Slider";
import Profile from "./Profile";
import HistoryList from "./HistoryList";
import Log from "./Log";
import ChartWorkout from "./ChartWorkout";
import TitleImage from "./TitleImage";

//landing logged in page comment

//data visualization


const Main = () => {
  const currentDate = moment().format('dddd, MMMM D');

  return (
    <div>
      <TitleImage icon={"fa-solid fa-table-columns"}/>

      {/* Header */}
      <div className="p-3 text-start bg-dark opacity-75">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-warning">Welcome User</h1>
          <p className="col-md-8 fs-4 text-white">{currentDate}</p>
          <p className="col-md-8 fs-4 text-white">CHAT GPT generated motivation</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container mt-5">
        {/* <h3 className="display-5 fw-bold text-warning">Profile</h3> */}
        <Profile/>
      </div>

      {/* Add Workout Section */}
      <div className="container mt-5">
        {/* <h3 className="display-5 fw-bold text-warning">Add Workout |  Today's Session</h3> */}
        {/* Add your "Add Workout" content here */}
      </div>

      {/* Program Schedule Section USE SLIDER OR CAROUSEL*/}
      <div className="container mt-5">
        <SliderComponent/>
        {/* Add your "Program Schedule" content here */}
      </div>

      {/* Recent Activity History Section */}
      <div className="container mt-5">
        {/* <h3 className="display-5 fw-bold text-warning">Recent Activity History</h3> */}
        {/* Add your "Recent Activity History" content here */}
        <HistoryList/>
      </div>

        {/* Analytics Section */}
        <div className="container mt-5">
        {/* <h3 className="display-5 fw-bold text-warning">Analytics</h3> */}
        {/* Exercise Tracker */}
        <ChartWorkout/>
      </div>
    </div>
  );
};



export default Main;
