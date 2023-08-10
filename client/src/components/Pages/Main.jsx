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

      <div className="row row-cols-1 row-cols-md-2 bg-dark opacity-75">
        <div class="p-3 text-start col col-sm-12 col-md-6 col-lg-7 text-white ">
          <div className="container-fluid py-5 px-3">
            <h1 className="display-5 fw-bold text-warning mb-0">
              Welcome User
            </h1>
            <p className="text-secondary fw-bold fs-5">{currentDate}</p>
          </div>
          <div className="p-3">
            <ProfileProvider>
              <ChatGptDailySummary />
            </ProfileProvider>
          </div>
        </div>

        <div className="text-start col col-sm-12 col-md-6 col-lg-5">
          <ProfileProvider>
            <Profile />
          </ProfileProvider>
        </div>
      </div>

      <Log />

      {/* Program Schedule Section USE SLIDER OR CAROUSEL*/}
      {/* delete slider-container */}
      <div className="bg-dark opacity-75 p-5">
        <h1 className="display-5 fw-bold text-warning">
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
