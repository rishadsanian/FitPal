import './styles/App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Log from "./components/Log";

import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Log/>
    </div>
  );
}
export default App;
