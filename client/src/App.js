import './styles/App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { AppBar, Toolbar}from '@mui/material';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
      {/* <Login /> */}
    </div>
  );
}

export default App;
