
import './styles/App.css';
import { AppBar, Toolbar}from '@mui/material';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
        <AppBar position="static" color="primary"> 
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          </Toolbar>
        </AppBar>
        <LandingPage />
    </div>
  );
}

export default App;
