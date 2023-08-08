import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar-Footer/Navbar';

import Main from "./components/Pages/Main";
import ProgramDetail from './components/Programs/ProgramDetail';
import Login from './components/Login-SignUp/Login';
import LandingPage from './components/Pages/LandingPage';
import Log from './components/Pages/Log';
import DevTest from './components/Pages/DevTest';


import SessionDetail from './components/Sessions/SessionDetail';
import ExerciseLog from './components/Exercises/ExerciseLog';
import Footer from './components/Navbar-Footer/Footer';
import SignUp from './components/Login-SignUp/SignUp';
import Profile from './components/Dashboard/Profile';
import ProgramsPage from './components/Pages/ProgramsPage';
import ChartWorkout from './components/Dashboard/ChartWorkout';
import ExerciseList from './components/Exercises/ExerciseList';

function App() {
  const [authenticated, setAuthenticated] = useState(window.sessionStorage.getItem('isAuthenticated'));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Login and signup routes */}
          <Route path="/login" element={authenticated ? <Main /> : <Login /> } />
          <Route path="/signup" element={authenticated ? <Main /> : <SignUp />} />

          {/* Page Routes */}
          <Route path="/dashboard" element={authenticated ? <Main /> : <Login/>} />
          <Route path="/programs" element={authenticated ? <ProgramsPage userView={true}/> : <ProgramsPage userView={false}/>} 
          />
          <Route path="/programs/:program_id" element={authenticated ? <ProgramDetail /> :<Login/>} />
          <Route path="/programs/log" element={authenticated ? <Log /> : <Login/>} />
          <Route path="/profile/1" element={authenticated ? <Profile /> : <Login/>} />
          <Route path="/chartworkout/4" element={authenticated ? <ChartWorkout /> : <Login/>} />
          <Route path="/programs/:program_id/sessions/:session_id" element={authenticated ? <SessionDetail /> : <Login/>} />
          <Route path="/programs/1/sessions/1/exercise/1" element={authenticated ? <ExerciseLog /> : <Login/>} />
          <Route path='/programs/:program_id/sessions/:session_id/exercises' element={authenticated ? <ExerciseList /> : <Login/>} />
          
          {/* Testing Routes */}
          <Route path="/test" element={<DevTest />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
