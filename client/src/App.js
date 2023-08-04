import "./styles/App.css";
import { Button, AppBar, Toolbar, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Log from "./components/Log";
function App() {
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button variant="contained">Login</Button>
            <Button variant="contained">Logout</Button>
          </Box>
          <Button variant="contained" size="medium" color="warning">
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

    <Log/>
    </div>
  );
}
export default App;
