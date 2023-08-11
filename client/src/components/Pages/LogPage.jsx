import React from 'react';
import Log from '../Dashboard/Log.jsx';
import { WorkoutProvider } from '../../contexts/WorkoutContext.js';

const LogPage = () => {
  return (
    <div>
      <WorkoutProvider>
        <Log/>
      </WorkoutProvider>
    </div>
  );
};

export default LogPage;
