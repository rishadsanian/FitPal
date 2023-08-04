import './styles/App.css';
import Navbar from './components/Navbar';

import ProgramDetail from './components/ProgramDetail';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Log from "./components/Log";

import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
      {/* <Login /> */}
      {/* <Log/> */}
    </div>
  );
}
export default App;
