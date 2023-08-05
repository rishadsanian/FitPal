import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar-Footer/Navbar';

import Main from "./components/Main";
import ProgramDetail from './components/Programs/ProgramDetail';
import Login from './components/Login-SignUp/Login';
import LandingPage from './components/LandingPage';
import Log from './components/Log';
import DevTest from './components/DevTest';


import SessionDetail from './components/Sessions/SessionDetail';
import ExerciseLog from './components/Exercises/ExerciseLog';
import Footer from './components/Navbar-Footer/Footer';
import SignUp from './components/Login-SignUp/SignUp';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/programs/:program_id" element={<ProgramDetail />} />
          <Route path="/programs/log" element={<Log />} />
          <Route path="/profile/1" element={<Profile />} />

          <Route
            path="/programs/:program_id/sessions/:session_id"
            element={<SessionDetail />}
          />
          <Route
            path="/programs/1/sessions/1/exercise/1"
            element={<ExerciseLog />}
          />
          <Route path="/test" element={<DevTest />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
