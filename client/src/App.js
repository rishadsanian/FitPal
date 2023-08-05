import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import ProgramDetail from "./components/ProgramDetail";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Log from "./components/Log";
import TitleImage from "./components/TitleImage";
import DevTest from "./components/DevTest";

import React, { useState, useEffect } from "react";
import SessionDetail from "./components/SessionDetail";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/programs/1" element={<ProgramDetail />} />
          <Route path="/programs/log" element={<Log />} />
          <Route path="/profile/1" element={<Profile />} />

          <Route path="/programs/1/sessions/1" element={<SessionDetail />} />

          <Route path="/test" element={<DevTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
