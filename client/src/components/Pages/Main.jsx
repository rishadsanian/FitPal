import React from 'react';
import moment from 'moment';
import SliderComponent from '../Dashboard/Slider';
import Profile from '../Dashboard/Profile';
import Log from './Log';
import ChartWorkout from '../Dashboard/ChartWorkout';
import TitleImage from '../TitleCards/TitleImage';
import '../../styles/Main.css';
import { ProfileProvider } from '../../contexts/ProfileContext';
import { WorkoutProvider } from '../../contexts/WorkoutContext';
import ChatGptDailySummary from '../Dashboard/ChatGptDailySummary';
//Dashboard/logged in main page

const Main = () => {
  // Formatted date for display
  const currentDate = moment().format('dddd, MMMM D');

  return (
    <div className="">
      {/* <TitleImage icon={'fa-solid fa-table-columns'} /> */}
      <div class="p-5 bg-dark opacity-75">
        <div className="container-fluid py-5 px-3 text-white text-start">
          <h1 className="display-5 fw-bold text-warning mb-0">
            Welcome User
          </h1>
          <p className="text-secondary">{currentDate}</p>
          <ProfileProvider>
            <ChatGptDailySummary />
          </ProfileProvider>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2">
        <div className="text-start col col-lg-5">
          <ProfileProvider>
            <Profile />
          </ProfileProvider>
        </div>

        <div className="col col-lg-7">
          <Log />
        </div>
      </div>

      {/* Program Schedule Section USE SLIDER OR CAROUSEL*/}
      {/* delete slider-container */}
      <div className="bg-dark opacity-75 p-5">
        <h1 className="display-5 fw-light text-warning">
          Program Schedule
        </h1>
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
