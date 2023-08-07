import React from 'react';
import { Box, Slide } from '@mui/material';
import moment from 'moment';
import SliderComponent from '../Slider';
import Profile from '../Profile';
import HistoryList from '../HistoryList';
import Log from '../Log';
import ChartWorkout from '../ChartWorkout';
import TitleImage from '../TitleCards/TitleImage';
import '../../styles/Main.css';
//Dashboard/logged in main page

const Main = () => {
  // Formatted date for display
  const currentDate = moment().format('dddd, MMMM D');

  return (
    <div className="main-container">
      <TitleImage icon={'fa-solid fa-table-columns'} />

      <div className="row row-cols-1 row-cols-md-2">
        {/* Header */}
        <div className="header-container p-3 text-start bg-dark col col-md-12 col-lg-4">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold text-warning">
              Welcome User
            </h1>
            <p className="col-md-8 text-white">{currentDate}</p>
            <p className="col-md-8 fs-4 text-white">
              CHAT GPT generated motivation
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-container col col-md-12 col-lg-8">
          <Profile />
        </div>
      </div>

      {/* Add Workout Section */}
      <div className="container">
        {/* <h3 className="display-5 fw-bold text-warning">Add Workout |  Today's Session</h3> */}
      </div>

      {/* Program Schedule Section USE SLIDER OR CAROUSEL*/}
      <div className="slider-container bg-dark opacity-75 p-5">
        <h1 className="display-5 fw-light text-warning">
          Program Schedule
        </h1>
        <SliderComponent />
      </div>

      {/* Recent Activity History Section */}

      <div className="history-container container mt-5">
        <HistoryList />
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
