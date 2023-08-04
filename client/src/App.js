import './styles/App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProgramDetail from './components/ProgramDetail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProgramDetail />
    </div>
  );
}

export default App;
