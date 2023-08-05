import './styles/App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Navbar from './components/Navbar-Footer/Navbar';

import ProgramDetail from './components/Programs/ProgramDetail';
import Login from './components/Login-SignUp/Login';
import LandingPage from './components/LandingPage';
import Log from "./components/Log";
import DevTest from './components/DevTest';

import SessionDetail from './components/Sessions/SessionDetail';
import ExerciseLog from './components/Exercises/ExerciseLog';
import Footer from './components/Navbar-Footer/Footer';
import SignUp from './components/Login-SignUp/SignUp';

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
