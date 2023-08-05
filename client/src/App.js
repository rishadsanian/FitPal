import './styles/App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Navbar from './components/Navbar';

import ProgramDetail from './components/ProgramDetail';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Log from "./components/Log";
import TitleImage from "./components/TitleImage";
import DevTest from './components/DevTest';

import React, { useState, useEffect } from 'react';
import SessionDetail from './components/SessionDetail';
import ExerciseLog from './components/ExerciseLog';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

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

          <Route path="/programs/1/sessions/1" element={<SessionDetail />} />
          <Route path="/programs/1/sessions/1/exercise/1" element={<ExerciseLog />} />
          <Route path="/test" element={<DevTest />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
